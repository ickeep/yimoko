import { observer } from '@formily/reactive-react';
import { StorePage } from '@yimoko/web';

export const StorePageDemo = observer(() => (
  <StorePage
    store={{ defaultValues: { id: '', name: '123' }, api: { url: '/api/user/add', method: 'post' } }}
    options={{ validateFirst: true }}
    schema={{
      type: 'object',
      properties: {
        form: {
          type: 'object', 'x-component': 'Form', 'x-component-props': { onAutoSubmit: '{{curStore.runAPI}}' },
          properties: {
            title: { type: 'void', 'x-component': 'Title', 'x-component-props': { children: '注册123' } },
            id: { type: 'string', title: 'ID', 'x-component': 'Input', 'x-decorator': 'FormItem' },
            name: { type: 'string', title: '名称', 'x-component': 'Input', 'x-decorator': 'FormItem', required: true },
            submit: {
              type: 'void', 'x-component': 'Submit',
              'x-component-props': { children: '提交' },
            },
          },
        },
      },
    }}
  />
));
