import { observer } from '@formily/reactive-react';
import { StorePage } from '@yimoko/web';

export const StorePageList = observer(() => (
  <StorePage
    store={{ defaultValues: { type: '', name: '123' }, api: { url: '/api/page/list' }, isRunNow: true }}
    options={{ validateFirst: true }}
    schema={{
      type: 'object',
      properties: {
        form: {
          type: 'void', 'x-component': 'Form', 'x-component-props': { onAutoSubmit: '{{curStore.runAPI}}', layout: 'inline' },
          properties: {
            title: { type: 'void', 'x-component': 'Title', 'x-component-props': { children: '列表页' } },
            type: { type: 'string', title: '类型', 'x-component': 'Input', 'x-decorator': 'FormItem' },
            name: { type: 'string', title: '名称', 'x-component': 'Input', 'x-decorator': 'FormItem', required: true },
            btns: {
              type: 'void', 'x-component': 'Space',
              properties: {
                submit: { type: 'void', 'x-component': 'Submit', 'x-component-props': { children: '查询' } },
                reset: { type: 'void', 'x-component': 'Reset', 'x-component-props': { children: '重置' } },
              },
            },

          },
        },
        name: {
          type: 'string', 'x-component': 'Test',
        },
        table: {
          type: 'array',
          'x-component': 'StoreTable',
          properties: {
            id: {
              'x-decorator-props': { width: 60 }, 'x-component': 'Test',
              properties: { id: { 'x-component': 'Test', 'x-component-props': { children: 'xxx' } } },
            },
            name: { 'x-decorator-props': { width: 100 } },
          },
        },
      },
    }}
  />
));
