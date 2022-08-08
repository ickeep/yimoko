
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
          v1: {
            'x-component': 'ActionSheet',
            'x-component-props': {
              title: '选择',
              options: [
                { name: '选项一', desc: '描述', color: 'red' },
                { name: '选项二', desc: '禁用', disabled: true },
                { name: '选项三', desc: 'loading', loading: true },
                { name: '选项四', desc: '微信开放能力 - 分享', openType: 'share' },
              ],
            },
          },

          d2: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '取消' } },
          v2: {
            'x-component': 'ActionSheet',
            'x-component-props': {
              cancelText: '取消',
              button: { children: '选择' },
              options: [
                { name: '选项一' },
                { name: '选项二' },
              ],
            },
          },

          d3: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '按钮属性' } },
          v3: {
            'x-component': 'ActionSheet',
            'x-component-props': {
              cancelText: '取消',
              button: { children: '选择', type: 'primary' },
              options: [
                { name: '选项一' },
                { name: '选项二' },
              ],
            },
          },
          d4: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: 'children' } },
          v4: {
            type: 'void',
            'x-component': 'ActionSheet',
            'x-component-props': {
              cancelText: '取消',
              // children: '字符串',
              button: { children: '选择', type: 'primary' },
              options: [
                { name: '选项一' },
                { name: '选项二' },
              ],
            },
            properties: {
              children: {
                type: 'void',
                'x-component': 'Text',
                'x-component-props': {
                  children: 'Text',
                  type: 'primary',
                },
              },
            },
          },
        },
      }}
    />
  </Page>
));

export default IndexPage;
