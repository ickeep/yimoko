import { observer } from '@formily/react';
import { StorePage } from '@yimoko/web';

export const StorePageList = observer(() => (
  <StorePage
    store={{
      defaultValues: {
        type: '', name: '123',
        // table: [{ id: '1', name: 'n1' }, { id: '2', name: 'n2' }],
      },
      api: { url: '/api/page/list' },
      isRunNow: true,
    }}
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
        table: {
          'x-component': 'StoreTable', 'x-decorator': 'RedirectListData',
          properties: {
            id: { type: 'number', 'x-component': 'Test' },
            name: {
              type: 'void', 'x-component': 'Space', properties: {
                name: {
                  type: 'stirng', 'x-component': 'Text',
                  'x-component-props': { children: '{{$record.name +"-"+ $index+$records[0].name}}' },
                },
              },
            },
          },
        },
        // table: {
        //   type: 'array',
        //   'x-component': 'StoreTable',
        //   'x-component-props': { bordered: '{{curStore.loading}}', title: '{{()=>curStore.loading?"加载中":"表格"}}' },
        //   properties: {
        //     id: {
        //       'x-decorator-props': { width: 60 }, 'x-component': 'Test', 'x-component-props': { children: '1111' },
        //       properties: { id: { 'x-component': 'Test', 'x-component-props': { children: '2222' } } },
        //     },
        //     name: { 'x-decorator-props': { width: 100 } },
        //   },
        // },
      },
    }}
  />
));
