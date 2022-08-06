import { observer } from '@formily/react';
import { StorePage } from '@yimoko/taro';

const IndexPage = observer(() => (
  <StorePage
    store={{ api: {}, defaultValues: { icon: 'star' } }}
    options={{}}
    schema={{
      type: 'object', properties: {
        icon: {
          'x-component': 'CellGroup',
          'x-component-props': {
            title: '基础组件',
            options: [
              { title: 'Icon 图标', url: '/pages/components/icon/index' },
            ],
          },
        },
      },
    }}
  />
));

export default IndexPage;
