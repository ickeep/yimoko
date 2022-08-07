export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/components/index',
    'pages/components/grid/index',
    'pages/components/swiper/index',
    'pages/components/icon/index',

    // in
    'pages/components/checkbox/index',
  ],
  tabBar: {
    list: [{
      pagePath: 'pages/index/index',
      text: '首页',
    }, {
      pagePath: 'pages/components/index',
      text: '组件',
    }],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
