import { observer } from '@formily/react';
import { StorePage } from '@yimoko/taro';

const IndexPage = observer(() => {
  console.log('xxxx');

  return (
    <StorePage
      store={{ api: {} }}
      options={{}}
      schema={{
        type: 'object', properties: {
          swiper: {
            items: [{
              type: 'void',
              'x-component': 'Image',
              'x-component-props': { src: 'https://img.yzcdn.cn/vant/t1.jpg', width: '100%', height: '100%' },
            },
            {
              type: 'void',
              'x-component': 'Image',
              'x-component-props': { src: 'https://img.yzcdn.cn/vant/t1.jpg', width: '100%', height: '100%' },
            }],
            'x-component': 'Swiper',
            'x-component-props': {
              autoplay: true,
              indicatorDots: true,
              options: [
                { title: 'T1', img: 'https://img.yzcdn.cn/vant/t1.jpg', desc: 'desc-1' },
                { title: 'T2', img: 'https://img.yzcdn.cn/vant/t2.jpg', desc: 'desc-2' },
              ],
            },
          },
          grid: {
            type: 'void',
            'x-component': 'Grid',
            'x-component-props': {
              columnNum: 2,
              options: [
                { icon: 'star-o', title: '我的收藏' },
                { icon: 'scan', title: '扫一扫' },
                { icon: 'service-o', title: '建议反馈' },
                { icon: 'question-o', title: '帮助中心' },
                // { img: 'https://img.yzcdn.cn/vant/t2.jpg' },
              ],
            },
            // items: [
            //   {
            //     type: 'void',
            //     'x-component': 'Image',
            //     'x-component-props': { src: 'https://img.yzcdn.cn/vant/t1.jpg', width: '100%', height: '100%' },
            //   },
            // ],
          },
          cell: {
            type: 'void',
            'x-component': 'CellGroup',
            'x-component-props': {
              title: '发现',
              options: [
                { title: '最新安装视频', desc: '如何安装，一分钟学会', value: 'xxx', isLink: true, icon: 'shop-o' },
                { title: '新品发布', desc: 'xxx xxx xxx 更轻 更好', value: 'xxx', isLink: true },
              ],
            },
          },
        },
      }}
    />

  );
});

export default IndexPage;
