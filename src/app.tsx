import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import type { RequestOptionsInit } from 'umi-request';
import defaultSettings from '../config/defaultSettings';

// 与后端约定的响应数据格式
interface ResponseStructure {
  code: number;
  msg: string;
  data: any;
}
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: User.LoginReq;
  loading?: boolean;
}> {
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    let currentUser: any = undefined;
    const storage =
      window.sessionStorage.getItem('userInfo') || window.localStorage.getItem('userInfo');
    if (!storage) {
      history.push(loginPath);
    } else {
      currentUser = JSON.parse(storage);
    }
    return {
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    layoutBgImgList: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return <>{children}</>;
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const authHeader = options?.headers ?? {};
  const storage =
    window.sessionStorage.getItem('userInfo') || window.localStorage.getItem('userInfo');
  if (storage) {
    const currentUser = JSON.parse(storage);
    if (currentUser.token) {
      authHeader['X-Auth-Token'] = currentUser.token;
    }
  }
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};
export const request: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: () => {},
    // 错误接收及处理
    errorHandler: () => {},
  },

  // 请求拦截器
  requestInterceptors: [authHeaderInterceptor],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;
      const path = response.request.responseURL;
      // 上传接口没有 code
      if (path.includes('bcebos.com')) {
        return response;
      }
      if (data?.code !== 0) {
        if (data.code === 999999) {
          window.localStorage.removeItem('userInfo');
          window.sessionStorage.removeItem('userInfo');
          const { location } = history;
          if (location.pathname !== '/user/login') {
            history.push('/user/login');
          }
          return Promise.reject({
            errorMessage: data.msg,
          });
        }
        return Promise.reject({
          errorMessage: data.msg,
        });
      }
      return {
        ...data,
        success: data.code === 0 || data.code === 999999,
        errorMessage: data.code === 0 || data.code === 999999 ? '' : data.msg || '',
      };
    },
  ],
};
