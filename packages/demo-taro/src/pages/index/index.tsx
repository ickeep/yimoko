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
        productx: {
          type: 'void',
          'x-component': 'ProductsIndex',
          'x-component-props': {
            itemURLPrefix: '/pages/product/detail',
            itemDefault: { url: '?id=<%=id%>' },
            store: {
              isRunNow: true,
              api: { url: '/options/products-index.json' },
            },
          },
        },
      },
    },
  };

  // console.log(JSON.stringify(props));

  return (
    <Page style={{ height: '100%', paddingTop: 200 }}>
      <StorePage {...props} />
    </Page>
  );
});

export default IndexPage;
