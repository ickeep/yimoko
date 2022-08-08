
import { observer } from '@formily/react';
import { Page, StorePage } from '@yimoko/taro';

const IndexPage = observer(() => (
  <Page>
    <StorePage
      store={{ api: {}, isBindSearch: true, defaultValues: { v1: false, v2: true, v3: true, v4: false, v5: true, v6: 'off' } }}
      options={{}}
      schema={{
        type: 'object',
        properties: {
          d1: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '基本用法' } },
          v1: { 'x-component': 'Switch' },

          d2: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '禁用状态' } },
          v2: {
            'x-component': 'Switch',
            'x-component-props': { disabled: true },
          },

          d3: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '加载状态' } },
          v3: {
            'x-component': 'Switch',
            'x-component-props': { loading: true },
          },

          d4: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '自定义大小' } },
          v4: {
            'x-component': 'Switch',
            'x-component-props': { size: '42px' },
          },
          d5: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '自定义颜色' } },
          v5: {
            'x-component': 'Switch',
            'x-component-props': { activeColor: '#07c160', inactiveColor: '#ee0a24' },
          },

          d6: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '自定义值' } },
          v6: {
            'x-component': 'Switch',
            'x-component-props': { values: { true: 'on', false: 'off' } },
          },
          view6: {
            type: 'void',
            'x-component': 'View',
            properties: {
              v6: { 'x-component': 'View' },
            },
          },
        },
      }}
    />
  </Page>
));

export default IndexPage;
