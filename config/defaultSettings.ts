import { ProLayoutProps } from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: '标题',
  pwa: false,
  logo: '/logo.svg',
  splitMenus: true,
  siderMenuType: 'group',
  iconfontUrl: '',
  menu: {
    locale: false,
  },
};

export default Settings;
