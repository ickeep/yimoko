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
        phone: '12',
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
            store: {
              isRunNow: true,
              api: { url: 'https://json.rsstu.com/yeya/product/list.json' },
            },
          },
        },
      },
    },
  };

  // console.log(JSON.stringify(props));

  return (
    <Page>
      <StorePage {...props} />
    </Page>
  );
});

export default IndexPage;
