
import { observer } from '@formily/react';
import { useRoot } from '@yimoko/store';
import { Field, Page, StorePage, StorePageProps } from '@yimoko/taro';

const IndexPage = observer(() => {
  const { loading } = useRoot();

  console.log('root loading', loading);

  const props: StorePageProps<object, unknown> = {
    store: {
      api: {},
      defaultValues: {
        value: {
          v1: 'v3',
          v2: 'v3-c2',
          v7: ['110000', '110100', '110101'],
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
              'x-component': 'Picker',
              'x-component-props': {
                clearable: true,
                options: [
                  { label: 't-v1', value: 'v1' },
                  { label: 't-v2', value: 'v2' },
                  { label: 't-v3', value: 'v3' },
                  { label: 't-v4', value: 'v4' },
                ],
              },
            },
            v2: {
              'x-component': 'PickerMulti',
              'x-component-props': {
                clearable: true,
                type: 'multiSelector',
                api: {
                  url: 'https://static-ickeep-1251135819.cos.ap-guangzhou.myqcloud.com/demo-taro/api/options/multi.json',
                },
              },
            },
            v7: {
              'x-decorator': 'Field',
              'x-decorator-props': {
                label: 'checkbox',
              },
              'x-component': 'PickerRegion',
              'x-component-props': {
                clearable: true,
                options: [
                  {
                    value: '1',
                    label: '1',
                  },
                  {
                    value: '2',
                    label: '2',
                  },
                ],
              },
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

  // console.log(JSON.stringify(props));

  return (
    <Page>
      <Field clearable placeholder='请输入'></Field>
      <StorePage {...props} />
    </Page>
  );
});

export default IndexPage;
