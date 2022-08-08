
import { observer } from '@formily/react';
import { Page, StorePage } from '@yimoko/taro';

const IndexPage = observer(() => (
  <Page>
    <StorePage
      store={{ api: {}, isBindSearch: true, defaultValues: { v1: 4, v2: [10, 50], v3: 10, v4: 50, v5: 0, v6: 5, v7: 10, v8: 20, v9: 30 } }}
      options={{}}
      schema={{
        type: 'object',
        properties: {
          d1: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '基本用法' } },
          v1: {
            'x-component': 'Slider',
          },
          d2: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '双滑块' } },
          v2: {
            'x-component': 'Slider',
            'x-component-props': { range: true },
          },
          d3: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '双滑块 多字段' } },
          '[v3,v4]': {
            'x-component': 'Slider',
            'x-component-props': { range: true },
          },

          d5: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '指定选择范围' } },
          v5: {
            'x-component': 'Slider',
            'x-component-props': { min: -50, max: 50 },
          },
          d6: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '禁用' } },
          v6: {
            'x-component': 'Slider',
            'x-component-props': { disabled: true },
          },

          d7: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '指定步长' } },
          v7: {
            'x-component': 'Slider',
            'x-component-props': { step: 10 },
          },
          d8: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '自定义样式' } },
          v8: {
            'x-component': 'Slider',
            'x-component-props': { barHeight: '4px', activeColor: '#ee0a24' },
          },
          d9: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '垂直方向' } },
          v9: {
            'x-component': 'Slider',
            'x-component-props': { vertical: true, style: { height: '200px' } },
          },
        },
      }}
    />
  </Page>
));

export default IndexPage;
