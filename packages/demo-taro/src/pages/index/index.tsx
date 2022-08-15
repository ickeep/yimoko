
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
          v1: 'v3',
          v2: 'v3-c2',
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
            // v1: {
            //   'x-component': 'Picker',
            //   'x-component-props': {
            //     options: [
            //       { label: 't-v1', value: 'v1' },
            //       { label: 't-v2', value: 'v2' },
            //       { label: 't-v3', value: 'v3' },
            //       { label: 't-v4', value: 'v4' },
            //     ],
            //   },
            // },
            v2: {
              'x-component': 'PickerMulti',
              'x-component-props': {
                type: 'multiSelector',
                options: [
                  {
                    label: 'v1', value: 'v1', child: [
                      { label: 'v1-c1', value: 'v1-c1' },
                      { label: 'v1-c2', value: 'v1-c2' },
                      { label: 'v1-c3', value: 'v1-c3' }],
                  },
                  {
                    label: 'v2', value: 'v2', child: [
                      { label: 'v2-c1', value: 'v2-c1' },
                      { label: 'v2-c2', value: 'v2-c2' },
                      { label: 'v2-c3', value: 'v2-c3' },
                      { label: 'v2-c4', value: 'v2-c4' },
                    ],
                  },
                  {
                    label: 'v3', value: 'v3', child: [
                      { label: 'v3-c1', value: 'v3-c1' },
                      { label: 'v3-c2', value: 'v3-c2' },
                      { label: 'v3-c3', value: 'v3-c3' },
                    ],
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

  // @ts-ignore
  return <Page> <StorePage {...props} /></Page >;
});

export default IndexPage;
