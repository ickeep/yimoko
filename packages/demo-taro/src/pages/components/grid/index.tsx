import { observer } from '@formily/react';
import { StorePage } from '@yimoko/taro';

const IndexPage = observer(() => (
  <StorePage
    store={{ api: {}, defaultValues: { icon: 'star' } }}
    options={{}}
    schema={{
      type: 'object', properties: {
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
              // { img: 'https://img.yzcdn.cn/vant/t2.jpg', icon: 'question-o', title: '帮助中心' },
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
      },
    }}
  />
));

export default IndexPage;
