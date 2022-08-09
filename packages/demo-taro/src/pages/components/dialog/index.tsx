
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
            type: 'void',
            'x-component': 'Dialog',
            'x-component-props': {
              title: 'Dialog',
              message: 'message',
            },
          },

          d2: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '取消' } },
          v2: {
            type: 'void',
            'x-component': 'Dialog',
            'x-component-props': {
              title: 'Dialog',
              showCancelButton: true,
            },
            properties: {
              b: {
                type: 'void',
                'x-component': 'Text',
                'x-component-props': { children: 'Text 自定义', type: 'info' },
              },
            },
          },

          d3: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '触发按钮属性' } },
          v3: {
            'x-component': 'Dialog',
            'x-component-props': {
              cancelText: '取消',
              message: 'message',
              button: { children: '弹出', type: 'primary' },
            },
          },
          d4: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '弹窗内容' } },
          v4: {
            type: 'void',
            'x-component': 'Dialog',
            'x-component-props': {
              button: { children: '自定义弹窗内容', type: 'primary' },
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
          d5: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '触发内容' } },
          v5: {
            type: 'void',
            'x-component': 'Dialog',
            'x-component-props': { message: 'message' },
            additionalProperties: {
              type: 'void',
              'x-component': 'Text',
              'x-component-props': {
                children: 'Text',
                type: 'info',
              },
            },
          },
          d6: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '微信原生能力' } },
          v6: {
            type: 'void',
            'x-component': 'Dialog',
            'x-component-props': {
              confirmButtonOpenType: 'share',
              button: { children: '确认分享', type: 'warning' },
              message: 'message',
            },
          },
        },
      }}
    />
  </Page>
));

export default IndexPage;
