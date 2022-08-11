
import { observer } from '@formily/react';
import { useRoot } from '@yimoko/store';
import { Page, StorePage, StorePageProps } from '@yimoko/taro';

const IndexPage = observer(() => {
  const { loading } = useRoot();

  console.log('root loading', loading);

  const props: StorePageProps = {
    store: { api: {}, defaultValues: { v2: '' } },
    options: {},
    schema: {
      type: 'object',
      properties: {
        d1: {
          type: 'void',
          'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '基本用法' },
        },
        v1: {
          type: 'void', 'x-component': 'Steps',
          'x-component-props': {
            options: [
              { text: 'options 1', value: 'v1', desc: 'desc 1 的内容' },
              { text: 'options 2', value: 'v2', desc: 'desc 2 的内容' },
              { text: 'options 2', value: 'v3', desc: 'desc 2 的内容' },
            ],
          },
        },

        d2: {
          type: 'void',
          'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '受控' },
        },
        v2: {
          'x-component': 'Steps',
          'x-component-props': {
            options: [
              { text: 'options 1', value: 'v1', desc: 'desc 1 的内容' },
              { text: 'options 2', value: 'v2', desc: 'desc 2 的内容' },
              { text: 'options 2', value: 'v3', desc: 'desc 2 的内容' },
            ],
          },
        },

        c: {
          type: 'void',
          'x-component': 'View',
          properties: {
            v2: {
              type: 'string',
              'x-component': 'RadioGroup',
              'x-component-props': { options: [{ label: '至 1', value: 'v1' }, { label: '至 2', value: 'v2' }, { label: '至 3', value: 'v3' }] },
            },
          },
        },
      },
    },
  };

  console.log(JSON.stringify(props));

  // @ts-ignore
  return <Page><StorePage {...props} /></Page >;
});

export default IndexPage;
