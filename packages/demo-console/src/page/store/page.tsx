import { observer } from '@formily/react';
import { StorePage } from '@yimoko/web';

export const StorePageDemo = observer(() => (
  <StorePage
    store={{ defaultValues: { id: '', name: '123' }, api: { url: '/api/user/add', method: 'post' } }}
    options={{ validateFirst: true }}
    schema={{
      type: 'object',
      properties: {
        form: {
          type: 'void', 'x-component': 'Form', 'x-component-props': { onAutoSubmit: '{{curStore.runAPI}}' },
          properties: {
            title: { type: 'void', 'x-component': 'Title', 'x-component-props': { children: '注册' } },
            id: { type: 'string', title: 'ID', 'x-component': 'Input', 'x-decorator': 'FormItem' },
            name: { type: 'string', title: '名称', 'x-component': 'Input', 'x-decorator': 'FormItem', required: true },
            btns: {
              type: 'void', 'x-component': 'Space',
              properties: {
                submit: { type: 'void', 'x-component': 'Submit', 'x-component-props': { children: '提交' } },
                reset: { type: 'void', 'x-component': 'Reset', 'x-component-props': { children: '重置' } },
                log: {
                  type: 'void', 'x-component': 'Button',
                  'x-component-props': { children: 'log', onClick: '{{()=>console.log(curStore.values)}}' },
                },
                setValue: {
                  type: 'void', 'x-component': 'Button',
                  'x-component-props': { children: 'setValue', onClick: '{{()=>curStore.setValues({id:123,name:456})}}' },
                },
              },
            },
          },
        },
      },
    }}
  />
));
