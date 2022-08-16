
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
          v2: 'v1',
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
            Menu: {
              'x-component': 'DropdownMenu',
              items:
                [
                  {
                    name: 'v1',
                    'x-component': 'DropdownItem',
                    'x-component-props': {
                      title: 'api 数据',
                      api: { url: 'https://static-ickeep-1251135819.cos.ap-guangzhou.myqcloud.com/demo-taro/api/options/single.json' },
                    },
                  },
                  {
                    name: 'v2',
                    'x-component': 'DropdownItem',
                    'x-component-props': {
                      title: 'options 数据',
                      options: [{ value: 'v1', label: 'v1' }, { value: 'v2', label: 'v2' }],
                    },
                  },
                ],
            },
            d2: {
              type: 'void',
              'x-component': 'Divider',
              'x-component-props': {
                children: '非受控',
                contentPosition: 'center',
              },
            },
            Menu2: {
              'x-component': 'DropdownMenu',
              items:
                [
                  {
                    'x-component': 'DropdownItem',
                    'x-component-props': {
                      title: 'api 数据',
                      api: { url: 'https://static-ickeep-1251135819.cos.ap-guangzhou.myqcloud.com/demo-taro/api/options/single.json' },
                    },
                  },
                  {
                    'x-component': 'DropdownItem',
                    'x-component-props': {
                      title: 'options 数据',
                      options: [{ value: 'v1', label: 'v1' }, { value: 'v2', label: 'v2' }],
                    },
                  },
                ],
            },
          },
        },
        show: {
          type: 'void',
          properties: {
            value: {
              type: 'object',
              properties: {
                v1: { 'x-component': 'Text' },
                v2: { 'x-component': 'Text', 'x-component-props': { type: 'info' } },
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
