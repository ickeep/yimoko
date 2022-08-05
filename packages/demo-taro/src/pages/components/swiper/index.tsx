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
        },
      }}
    />

  );
});

export default IndexPage;
