
import { observer } from '@formily/react';
import { Page, StorePage } from '@yimoko/taro';

const IndexPage = observer(() => (
  <Page>
    <StorePage
      store={{ api: {}, isBindSearch: true, defaultValues: {} }}
      options={{}}
      schema={{
        type: 'object',
        properties: {
          d1: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '基本用法' } },
          v1: { 'x-component': 'Text', 'x-component-props': { children: '基本用法' } },

          d2: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '自定义大小' } },
          v2: {
            'x-component': 'Text',
            'x-component-props': { children: '自定义大小 mini', size: 'mini', block: true },
          },
          v3: {
            'x-component': 'Text',
            'x-component-props': { children: '自定义大小 small', size: 'small', block: true },
          },
          v4: {
            'x-component': 'Text',
            'x-component-props': { children: '自定义大小 normal', size: 'normal', block: true },
          },
          v5: {
            'x-component': 'Text',
            'x-component-props': { children: '自定义大小 large', size: 'large', block: true },
          },
          d3: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '自定义颜色' } },
          v6: {
            'x-component': 'Text',
            'x-component-props': { children: '自定义颜色 primary', type: 'primary' },
          },
          v11: {
            'x-component': 'Text',
            'x-component-props': { children: '自定义颜色 info', type: 'info' },
          },
          v7: {
            'x-component': 'Text',
            'x-component-props': { children: '自定义颜色 success', type: 'success' },
          },
          v8: {
            'x-component': 'Text',
            'x-component-props': { children: '自定义颜色 warning', type: 'warning' },
          },
          v9: {
            'x-component': 'Text',
            'x-component-props': { children: '自定义颜色 default', type: 'default' },
          },
          v10: {
            'x-component': 'Text',
            'x-component-props': { children: '自定义颜色 danger', type: 'danger' },
          },
          d4: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '加粗' } },
          v12: {
            'x-component': 'Text',
            'x-component-props': { children: '普通' },
          },
          v13: {
            'x-component': 'Text',
            'x-component-props': { children: ' bold 加粗', bold: true },
          },
          d5: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '块级' } },
          v14: {
            'x-component': 'Text',
            'x-component-props': { children: '块 1', block: true },
          },
          v15: {
            'x-component': 'Text',
            'x-component-props': { children: '块 2', block: true },
          },
        },
      }}
    />
  </Page>
));

export default IndexPage;
