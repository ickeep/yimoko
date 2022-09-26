import { observer } from '@formily/react';
import { useBaseStore } from '@yimoko/store';
import { StoreDesc, StorePage } from '@yimoko/web';


export const StorePageDetail = observer(() => {
  const store = useBaseStore({
    fieldsConfig: {
      type: { title: '类型', tooltip: 'xxx', type: 'string', 'x-component': 'Input', 'x-decorator': 'FormItem', column: { width: 130, autoFilter: true } },
      name: {
        type: 'string', title: '名称', tooltip: 'xxx',
        'x-component': 'Input', 'x-decorator': 'FormItem', required: true, column: { autoFilter: true },
        desc: { tooltip: { icon: <>123</>, title: 'xxxx' } },
      },
    },
    // type: 'list',
    dictConfig: [
      { field: 'type', data: [{ value: 't1', label: '类型1' }, { value: 't2', label: '类型2' }] },
      // { field: 'name', data: [{ value: 'n1', label: '名字1' }, { value: 'n2', label: '名字2' }] },
    ],
    defaultValues: { type: 'type', name: 'name' },
    api: { url: '/api/page/list' },
    // isRunNow: false,
    // isBindSearch: false,
  });
  return (
    <StorePage store={store} schema={{}} >
      <StoreDesc fields={['type', 'name', { field: 'name', tooltip: { color: 'red', title: 'xxx' } }]}></StoreDesc>
    </StorePage>
  );
});

