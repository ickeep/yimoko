import { observer } from '@formily/react';
import { useRoot } from '@yimoko/store';
import { Page, StorePage, StorePageProps } from '@yimoko/taro';

const IndexPage = observer(() => {
  const { loading } = useRoot();

  console.log('root loading', loading);

  const props: StorePageProps<object, unknown> = {
    store: {
      type: 'list',
      api: { url: '/options/article-list.json' },
      defaultValues: {},
    },
    options: {},
    schema: {
      type: 'object',
      properties: {
        // test: {
        //   type: 'string',
        //   'x-component': 'Test',
        // },
        article: {
          type: 'void',
          'x-component': 'StoreScrollView',
          'x-component-props': {
            itemURLPrefix: '/pages/article/detail',
            itemDefault: { url: '?id=<%=id%>' },
          },
          // properties: {
          //   xxx: {
          //     type: 'void',
          //     'x-component': 'CardList',
          //     'x-component-props': {
          //       options: '<%=curStore.listData%>',
          //     },
          //   },
          // },
          items: {
            type: 'void',
            properties: {
              view: {
                type: 'void',
                'x-component': 'View',
                'x-component-props': {
                  style: { margin: '20rpx', backgroundColor: '#fff' },
                },
                properties: {
                  title: {
                    type: 'string',
                    'x-component': 'Text',
                    'x-component-props': {
                      size: 'large',
                      block: true,
                      style: { padding: '20rpx' },
                    },
                  },
                  img: { type: 'string', 'x-component': 'Image', 'x-component-props': { fit: 'cover', style: { width: '100%', height: '300rpx' } } },
                  desc: { type: 'string', 'x-component': 'Text', 'x-component-props': { size: 'small', block: true, style: { padding: '20rpx' } } },
                },
              },
            },
          },
        },
      },
    },
  };

  console.log(JSON.stringify(props));

  return (
    <Page style={{ height: '100%', paddingTop: 0 }}>
      <StorePage {...props} />
    </Page>
  );
});

export default IndexPage;
