export default defineAppConfig({
  pages: [
    // base
    'pages/index/index',
    'pages/components/index',
    'pages/components/grid/index',
    'pages/components/swiper/index',
    'pages/components/icon/index',
    'pages/components/text/index',

    // feedback
    'pages/components/action-sheet/index',

    // in
    'pages/components/checkbox/index',
    'pages/components/radio/index',
    'pages/components/rate/index',
    'pages/components/slider/index',
    'pages/components/stepper/index',
    'pages/components/switch/index',
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
