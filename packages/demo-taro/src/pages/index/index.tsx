
import { observer } from '@formily/react';
import { useRoot } from '@yimoko/store';
import { Page, StorePage, StorePageProps } from '@yimoko/taro';

const IndexPage = observer(() => {
  const { loading } = useRoot();

  console.log('root loading', loading);

  const props: StorePageProps = {
    store: {
      api: {},
      isBindSearch: true,
      defaultValues: {
        c1: '',
        c2: 0,
        cg: [],
        cg2: '',
      },
    },
    options: {},
    schema: {
      type: 'object',
      properties: {
        c1: {
          'x-component': 'Checkbox',
          'x-component-props': {
            children: 'bool',
          },
        },
        c2: {
          'x-component': 'Checkbox',
          'x-component-props': {
            values: {
              true: 1,
              false: 0,
            },
            children: 'num',
          },
        },
        cg: {
          'x-component': 'CheckboxGroup',
          'x-component-props': {
            options: [
              {
                label: '一',
                value: '1',
              },
              {
                label: '二',
                value: '2',
              },
            ],
          },
        },
        cg2: {
          'x-component': 'CheckboxGroup',
          'x-component-props': {
            direction: 'horizontal',
            valueType: 'string',
            options: [
              {
                label: '一',
                value: '1',
              },
              {
                label: '二',
                value: '2',
              },
            ],
          },
          items: [
            {
              'x-component': 'Checkbox',
              'x-component-props': {
                children: '三',
                name: '3',
              },
              properties: {
                text: {
                  type: 'void',
                  'x-component': 'Text',
                  'x-component-props': {
                    children: '三',
                    type: 'info',
                  },
                },
              },
            },
          ],
        },
      },
    },
  };

  // console.log(JSON.stringify(props));

  // @ts-ignore
  return <Page> <StorePage {...props} /></Page >;
});

export default IndexPage;
