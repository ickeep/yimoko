
import { observer } from '@formily/react';
import { useRoot } from '@yimoko/store';
import { Page, StorePage, StorePageProps } from '@yimoko/taro';

const IndexPage = observer(() => {
  const { loading } = useRoot();

  console.log('root loading', loading);

  const props: StorePageProps = {
    store: { api: {}, defaultValues: { r1: 4, r2: '2', r3: 3, r4: 4, r5: 10, r6: 1, r7: 2 } },
    options: {},
    schema: {
      type: 'object',
      properties: {
        r1: {
          'x-decorator': 'Cell',
          'x-decorator-props': { title: '基础用法' },
          'x-component': 'Rate',
        },
        r2: {
          'x-component': 'Rate',
          'x-decorator': 'Cell',
          'x-decorator-props': { title: '自定义图标' },
          'x-component-props': {
            icon: 'like',
            voidIcon: 'like-o',
          },
        },
        r3: {
          'x-component': 'Rate',
          'x-decorator': 'Cell',
          'x-decorator-props': { title: '自定义样式' },
          'x-component-props': {
            size: 25,
            color: '#ffd21e',
            voidIcon: 'star',
            voidColor: '#eee',
          },
        },
        r4: {
          'x-decorator': 'Cell',
          'x-decorator-props': { title: '半星' },
          'x-component': 'Rate',
          'x-component-props': {
            allowHalf: true,
          },
        },
        r5: {
          'x-decorator': 'Cell',
          'x-decorator-props': { title: '自定义数量' },
          'x-component': 'Rate',
          'x-component-props': {
            count: 6,
          },
        },
        r6: {
          'x-decorator': 'Cell',
          'x-decorator-props': { title: '禁用状态' },
          'x-component': 'Rate',
          'x-component-props': {
            disabled: true,
          },
        },
        r7: {
          'x-decorator': 'Cell',
          'x-decorator-props': { title: '只读状态' },
          'x-component': 'Rate',
          'x-component-props': {
            readonly: true,
          },
        },
      },
    },
  };

  // console.log(JSON.stringify(props));

  // @ts-ignore
  return <Page><StorePage {...props} /></Page>;
});

export default IndexPage;
