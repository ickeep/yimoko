import { observer } from '@formily/react';
import { StorePage } from '@yimoko/web';

export const StorePageList = observer(() => (
  <StorePage
    store={{
      fieldsConfig: {
        type: { title: '类型', type: 'string', 'x-component': 'Input', 'x-decorator': 'FormItem' },
        name: { type: 'string', title: '名称', 'x-component': 'Input', 'x-decorator': 'FormItem', required: true },
      },
      type: 'list',
      dictConfig: [
        { field: 'type', data: [{ value: 't1', label: '类型1' }, { value: 't2', label: '类型2' }] },
        { field: 'name', data: [{ value: 'n1', label: '名字1' }, { value: 'n2', label: '名字2' }] },
      ],
      defaultValues: { type: '', name: 'n1' },
      api: { url: '/api/page/list' },
      // isRunNow: false,
      // isBindSearch: false,
    }}
    options={{ validateFirst: true }}
    schema={{
      type: 'object',
      definitions: {},
      properties: {
        title: { type: 'void', 'x-component': 'Title', 'x-component-props': { children: '列表页' } },
        form: {
          type: 'void', 'x-component': 'StoreForm',
          'x-component-props': { fields: ['type', { field: 'name', title: 'xxx' }] },
          properties: {
            // type: { $ref: '#/definitions/type' },
            // name: { $ref: '#/definitions/name' },

          },
        },
        btns: {
          type: 'void', 'x-component': 'Space',
          properties: {
            submit: { type: 'void', 'x-component': 'Submit', 'x-component-props': { children: '查询' } },
            reset: { type: 'void', 'x-component': 'Reset', 'x-component-props': { children: '重置' } },
          },
        },
        table: {
          'x-component': 'StoreTable', 'x-decorator': 'RedirectListData', 'x-component-props': { rowSelection: { fixed: true } },
          properties: {
            id: { 'x-component': 'Test', 'x-decorator-props': { sorter: true } },
            name: {},
            name2: {
              $ref: '#/definitions/name',
              type: 'void', 'x-component': 'Space',
              'x-decorator-props': { sorter: true, filterMultiple: true },
              properties: {
                name: {
                  type: 'stirng', 'x-component': 'Link',
                  'x-component-props': { href: 'https://www.baidu.com', copyable: true },
                  // 'x-component-props': { children: '{{$record.name +"-"+ $index+$records[0].name}}' },
                },
              },
            },
            type: { 'x-decorator-props': { filterMultiple: false } },
          },
        },
      },
    }}
  />
));
