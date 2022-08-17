
import { observer } from '@formily/react';
import { useRoot } from '@yimoko/store';
import { Page, StorePage, StorePageProps } from '@yimoko/taro';

const IndexPage = observer(() => {
  const { loading } = useRoot();

  console.log('root loading', loading);

  const props: StorePageProps<object, unknown> = {
    store: {
      api: {},
      defaultValues: {
        value: {
          v1: '',
          v2: '',
        },
      },
    },
    options: {},
    schema: {
      type: 'object',
      properties: {
        value: {
          type: 'object',
          properties: {
            d1: {
              type: 'void',
              'x-component': 'Divider',
              'x-component-props': {
                children: '受控',
                contentPosition: 'center',
              },
            },
            v1: {
              'x-component': 'Uploader',
              'x-component-props': {
                multiple: true,
                valueType: 'string[]',
              },
            },
            d2: {
              type: 'void',
              'x-component': 'Divider',
              'x-component-props': {
                children: '非受控',
                contentPosition: 'center',
              },
            },
            v2: {
              'x-component': 'Uploader',
            },
          },
        },
        show: {
          type: 'void',
          'x-component': 'View',
          'x-component-props': { style: { padding: 20 } },
          properties: {
            value: {
              type: 'object',
              properties: {
                v1: { 'x-component': 'Image', 'x-component-props': { width: 100, height: 100 } },
                v2: { 'x-component': 'Image', 'x-component-props': { width: 100, height: 100 } },
              },
            },
          },
        },
      },
    },
  };

  console.log(JSON.stringify(props));

  return (
    <Page>
      <StorePage {...props} />
    </Page>
  );
});

export default IndexPage;
