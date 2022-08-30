import { observer } from '@formily/react';
import { useRoot } from '@yimoko/store';
import { Page, StorePage, StorePageProps } from '@yimoko/taro';

const IndexPage = observer(() => {
  const { loading } = useRoot();

  console.log('root loading', loading);

  const props: StorePageProps<object, unknown> = {
    store: {
      api: { method: 'POST', url: '/api/test' },
      defaultValues: {
        phone: '122',
        code: '',
      },
    },
    options: {},
    schema: {
      type: 'object',
      properties: {
        article: {
          type: 'void',
          'x-component': 'StoreScrollView',
          'x-component-props': {
            itemURLPrefix: '/pages/article/detail',
            itemDefault: { url: '?id=<%=id%>' },
            store: {
              // isRunNow: true,
              api: { url: '/options/article-list.json' },
            },

          },
          items: {
            type: 'void',
            properties: {
              img: { type: 'string', 'x-component': 'Image', 'x-component-props': { mode: 'widthFix', style: { width: '100%' } } },
            },
          },
        },
      },
    },
  };

  // console.log(JSON.stringify(props));

  return (
    <Page style={{ height: '100%', paddingTop: 0 }}>
      <StorePage {...props} />
    </Page>
  );
});

export default IndexPage;
