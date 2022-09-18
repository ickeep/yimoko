import { Submit } from '@formily/antd';
import { observer } from '@formily/react';
import { useListStore, useOperateStore } from '@yimoko/store';
import { Drawer, StoreForm, StorePage, StorePageContent, StoreTable } from '@yimoko/web';
import { Space } from 'antd';


export const StorePageList = observer(() => {
  const store = useListStore({
    fieldsConfig: {
      type: { title: '类型', type: 'string', 'x-component': 'Input', 'x-decorator': 'FormItem', column: { width: 130 } },
      name: { type: 'string', title: '名称', 'x-component': 'Input', 'x-decorator': 'FormItem', required: true },
    },
    // type: 'list',
    dictConfig: [
      { field: 'type', data: [{ value: 't1', label: '类型1' }, { value: 't2', label: '类型2' }] },
      // { field: 'name', data: [{ value: 'n1', label: '名字1' }, { value: 'n2', label: '名字2' }] },
    ],
    defaultValues: { type: '', name: '123' },
    api: { url: '/api/page/list' },
    // isRunNow: false,
    // isBindSearch: false,
  });
  return (
    <Drawer title="xxxx" footer={true} isBindStore={true}>
      <StorePage store={store} >
        <StoreForm fields={['name']}>
          <Space>
            <Submit>查询</Submit>
          </Space>
        </StoreForm>
        {/* <StorePageContent >
        <StoreTable
          isControlled={false}
          store={store}
          expandable={{
            isTitleControlsAll: true,
            expandedRowRender: record => <p style={{ margin: 0 }}>{record.name}</p>,
            icon: {
              expanded: { name: 'RightOutlined', style: { color: 'blue' } },
              collapsed: 'DownOutlined',
            },
          }}
          columns={[
            { dataIndex: 'id', autoSorter: 'number', fixed: 'left' },
            { dataIndex: 'name', autoFilter: true },
            { dataIndex: 'type', autoFilter: true },
            { dataIndex: 'date', title: 'date', autoSorter: 'date' },
            { dataIndex: 'time', title: 'time', autoSorter: 'time' },
            { dataIndex: 'percentage', title: 'percentage', autoSorter: 'percentage' },
            { dataIndex: 'zh', title: 'zh', autoSorter: 'string', sorterParams: 'zh' },
            { dataIndex: 'length', title: 'length', autoSorter: 'length' },
          ]} />
      </StorePageContent> */}
      </StorePage>
    </Drawer>
  );
});

// export const StorePageList = observer(() => (
//   <StorePage
//     store={store}
//     options={{ validateFirst: true }}
//     schema={{
//       type: 'object',
//       definitions: {},
//       properties: {
//         title: { type: 'void', 'x-component': 'Title', 'x-component-props': { children: '列表页' } },
//         form: {
//           type: 'void', 'x-component': 'StoreForm',
//           'x-component-props': { fields: ['type', { field: 'name', title: 'xxx' }] },
//           properties: {
//             // type: { $ref: '#/definitions/type' },
//             // name: { $ref: '#/definitions/name' },
//             buttons: {
//               type: 'void', 'x-component': 'Space',
//               properties: {
//                 submit: { type: 'void', 'x-component': 'Submit', 'x-component-props': { children: '查询' } },
//                 reset: { type: 'void', 'x-component': 'Reset', 'x-component-props': { children: '重置' } },
//               },
//             },
//           },
//         },
//         content: {
//           type: 'void',
//           'x-component': 'StorePageContent',
//           'x-component-props': {
//           },
//           properties: {
//             table: {
//               type: 'void',
//               'x-component': 'StoreTable', 'x-decorator': 'RedirectListData',
//               'x-component-props': {
//                 isControlled: false,
//                 rowSelection: { fixed: true },
//                 expandable: {
//                   isTitleControlsAll: true,
//                   icon: {
//                     expanded: { name: 'RightOutlined', style: { color: 'blue' } },
//                     // expanded: 'RightOutlined',
//                     collapsed: 'DownOutlined',
//                   },
//                   expandedRowRender: (record: any) => <div>{record.id}</div>,
//                 },
//                 columns: ['name',
//                   { dataIndex: 'tag', width: 200, autoFilter: true, isFilterContains: true },
//                   { dataIndex: 'arr', width: 200, autoFilter: true, isFilterContains: true },
//                   {
//                     title: '合并', children: [
//                       { dataIndex: 'name', sorter: true, autoFilter: true },
//                       { dataIndex: 'id', autoSorter: 'number' },
//                     ],
//                   }],
//               },
//               items: [{
//                 type: 'string',
//                 name: 'id',
//                 title: 'ID',
//                 'x-decorator-props': { autoSorter: 'number', width: 300, autoFilter: true },
//               },
//               { name: 'name' },
//               {
//                 $ref: '#/definitions/name',
//                 type: 'void', 'x-component': 'Space',
//                 'x-decorator-props': {
//                   autoSorter: 'number', width: 600,
//                 },
//                 properties: {
//                   name: {
//                     type: 'string', 'x-component': 'Link',
//                     'x-component-props': { href: 'https://www.baidu.com', copyable: true },
//                     // 'x-component-props': { children: '{{$record.name +"-"+ $index+$records[0].name}}' },
//                   },
//                 },
//               },
//               { name: 'type', 'x-decorator-props': { autoFilter: true } },
//               ],
//             },
//           },
//         },
//       },
//     }}
//   />
// ));
