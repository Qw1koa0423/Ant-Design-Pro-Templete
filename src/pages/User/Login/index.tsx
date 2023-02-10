import { login } from '@/services/user/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { message } from 'antd';
import React from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const handleSubmit = async (values: User.LoginReq) => {
    try {
      // 登录
      const userInfo = await login({
        ...values,
      });
      window.localStorage.setItem(
        'userInfo',
        JSON.stringify({ ...userInfo, username: values.username }),
      );
      if (userInfo) {
        flushSync(() => {
          setInitialState((s: any) => ({
            ...s,
            currentUser: { ...userInfo, username: values.username },
          }));
        });
        message.success('登录成功！');
        if (!history) return;
        history.push('/');
      }
    } catch (error: any) {
      message.error(error.errorMessage);
    }
  };
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="遥在极清采集运营端"
          subTitle="遥在极清采集运营端"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as User.LoginReq);
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder={'请输入账号'}
            rules={[
              {
                required: true,
                message: '请输入账号！',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder={'请输入密码！'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </LoginForm>
      </div>
    </div>
  );
};
export default Login;
