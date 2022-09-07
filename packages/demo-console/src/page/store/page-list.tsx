import { observer } from '@formily/react';
import { ListStore } from '@yimoko/store';
import { StorePage } from '@yimoko/web';

const store = new ListStore<any, any>({
  fieldsConfig: {
    type: { title: '类型', type: 'string', 'x-component': 'Input', 'x-decorator': 'FormItem' },
    name: { type: 'string', title: '名称', 'x-component': 'Input', 'x-decorator': 'FormItem', required: true },
  },
  // type: 'list',
  dictConfig: [
    { field: 'type', data: [{ value: 't1', label: '类型1' }, { value: 't2', label: '类型2' }] },
    // { field: 'name', data: [{ value: 'n1', label: '名字1' }, { value: 'n2', label: '名字2' }] },
  ],
  defaultValues: { type: '', name: '' },
  api: { url: '/api/page/list' },
  // isRunNow: false,
  // isBindSearch: false,
});

// export const StorePageList = observer(() => (
//   <StorePage store={store} >
//     <StoreForm store={store}>
//       <Submit>查询</Submit>
//     </StoreForm>
//     <StorePageContent store={store} >
//       <StoreTable store={store} columns={[
//         { dataIndex: 'id', title: 'id l', fixed: 'left' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id' },
//         { dataIndex: 'id', title: 'id r', fixed: 'right' },
//       ]} />
//     </StorePageContent>
//   </StorePage>
// ));

export const StorePageList = observer(() => (
  <StorePage
    store={store}
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
            buttons: {
              type: 'void', 'x-component': 'Space',
              properties: {
                submit: { type: 'void', 'x-component': 'Submit', 'x-component-props': { children: '查询' } },
                reset: { type: 'void', 'x-component': 'Reset', 'x-component-props': { children: '重置' } },
              },
            },
          },
        },
        content: {
          type: 'void',
          'x-component': 'StorePageContent',
          'x-component-props': {
          },
          properties: {
            table: {
              type: 'void',
              'x-component': 'StoreTable', 'x-decorator': 'RedirectListData',
              'x-component-props': {
                // isControlled: false,
                rowSelection: { fixed: true },
                expandable: {
                  isTitleControlsAll: true,
                  icon: {
                    expanded: { name: 'RightOutlined', style: { color: 'blue' } },
                    // expanded: 'RightOutlined',
                    collapsed: 'DownOutlined',
                  },
                  expandedRowRender: (record: any) => <div>{record.id}</div>,
                },
                columns: ['name', {
                  title: '合并', children: [
                    { dataIndex: 'name', sorter: true, autoFilter: true },
                    { dataIndex: 'id', autoSorter: 'number', width: 300 },
                  ],
                }],
              },
              items: [{
                type: 'string',
                name: 'id',
                title: 'ID',
                'x-decorator-props': { autoSorter: 'number', width: 300, autoFilter: true },
              },
              { name: 'name' },
              {
                $ref: '#/definitions/name',
                type: 'void', 'x-component': 'Space',
                'x-decorator-props': {
                  autoSorter: 'number', width: 600,
                },
                properties: {
                  name: {
                    type: 'string', 'x-component': 'Link',
                    'x-component-props': { href: 'https://www.baidu.com', copyable: true },
                    // 'x-component-props': { children: '{{$record.name +"-"+ $index+$records[0].name}}' },
                  },
                },
              },
              { name: 'type', 'x-decorator-props': { autoFilter: true } },
              ],
            },
          },
        },
      },
    }}
  />
));
