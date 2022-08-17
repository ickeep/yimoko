
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
        phone: '',
        code: '',
      },
    },
    options: {},
    schema: {
      type: 'object',
      properties: {
        form: {
          type: 'object',
          'x-component': 'Form',
          properties: {
            phone: {
              type: 'string',
              title: '手机号',
              'x-component': 'Field',
            },
            code: {
              type: 'string',
              title: '验证码',
              'x-component': 'Field',
            },
            btn: {
              type: 'void',
              'x-component': 'Button',
              'x-component-props': {
                type: 'primary',
                children: '提交',
                formType: 'submit',
              },
            },
          },
        },
        // show: {
        //   type: 'void',
        //   'x-component': 'View',
        //   'x-component-props': { style: { padding: 20 } },
        //   properties: {
        //     value: {
        //       type: 'object',
        //       properties: {
        //         v1: { 'x-component': 'Text' },
        //         v2: { 'x-component': 'Image', 'x-component-props': { width: 100, height: 100 } },
        //       },
        //     },
        //   },
        // },
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
