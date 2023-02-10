export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/home', name: '首页', icon: 'HomeOutlined', component: './Home' },

  { path: '/', redirect: '/home' },
  { path: '*', layout: false, component: './404' },
];
