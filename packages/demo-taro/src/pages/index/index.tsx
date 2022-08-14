
import { observer } from '@formily/react';
import { useRoot } from '@yimoko/store';
import { Page, StorePage, StorePageProps } from '@yimoko/taro';

const IndexPage = observer(() => {
  const { loading } = useRoot();

  console.log('root loading', loading);

  const props: StorePageProps = {
    store: {
      api: {},
      defaultValues: {
        value: {
          v1: 'v1',
          v2: 2,
          v3: '3',
          v4: 4,
          v5: '5',
          v6: 'xxx',
          v7: [],
          v8: '1',
          v9: 2,
          v10: 20,
          v11: 20,
          v12: true,
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
            v1: {
              required: true,
              'x-component': 'Field',
              'x-component-props': {
                label: 'input',
              },
            },
            v2: {
              'x-component': 'Field',
              'x-component-props': {
                type: 'number',
                label: 'number',
              },
            },
            v3: {
              'x-component': 'Field',
              'x-component-props': {
                type: 'idcard',
                label: 'idcard',
              },
            },
            v4: {
              'x-component': 'Field',
              'x-component-props': {
                type: 'digit',
                label: 'digit',
              },
            },
            v5: {
              'x-component': 'Field',
              'x-component-props': {
                type: 'textarea',
                label: 'textarea',
              },
            },
            v6: {
              'x-component': 'Field',
              'x-component-props': {
                type: 'password',
                label: 'password',
                // password: true,
              },
            },
            v7: {
              'x-decorator': 'Field',
              'x-decorator-props': {
                label: 'checkbox',
              },
              'x-component': 'CheckboxGroup',
              'x-component-props': {
                options: [
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                ],
              },
            },
            v8: {
              'x-decorator': 'Field',
              'x-decorator-props': {
                label: 'radio',
              },
              'x-component': 'RadioGroup',
              'x-component-props': {
                options: [
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                ],
              },
            },
            v9: {
              'x-decorator': 'Field',
              'x-decorator-props': {
                label: 'rate',
              },
              'x-component': 'Rate',
            },
            v10: {
              'x-decorator': 'Field',
              'x-decorator-props': {
                label: 'slider',
                size: 'large',
              },
              'x-component': 'Slider',
            },
            v11: {
              'x-decorator': 'Field',
              'x-decorator-props': {
                label: 'stepper',
              },
              'x-component': 'Stepper',
            },
            v12: {
              'x-decorator': 'Field',
              'x-decorator-props': {
                label: 'switch',
              },
              'x-component': 'Switch',
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
                v7: { 'x-component': 'Text' },
              },
            },
          },
        },
      },
    },
  };

  // console.log(JSON.stringify(props));

  // @ts-ignore
  return <Page> <StorePage {...props} /></Page >;
});

export default IndexPage;
