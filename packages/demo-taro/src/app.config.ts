export default defineAppConfig({
  lazyCodeLoading: 'requiredComponents',
  pages: [
    'pages/index/index',
    'pages/components/index',
    'pages/components/detail',
    'pages/demo/index',
    'pages/demo/detail',
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/components/index',
        text: '组件',
      },
      {
        pagePath: 'pages/demo/index',
        text: 'Demo',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
