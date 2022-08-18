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
        phone: '',
        code: '',
      },
    },
    options: {},
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'void',
          'x-component': 'Text',
          'x-component-props': {
            block: true,
            bold: true,
            size: 'large',
            children: '登 录',
            style: { padding: 16, textAlign: 'center' },
          },
        },
        form: {
          type: 'void',
          'x-component': 'Form',
          'x-component-props': {
            notifyOnFail: true,
          },
          properties: {
            phone: {
              type: 'string',
              title: '手机号',
              required: true,
              'x-component': 'Field',
              'x-component-props': {
                size: 'large',
                type: 'number',
                leftIcon: 'phone-o',
              },
            },
            code: {
              type: 'string',
              title: '验证码',
              required: true,
              'x-component': 'Field',
              'x-component-props': {
                size: 'large',
                type: 'number',
                leftIcon: 'shield-o',
              },
            },
            btn: {
              type: 'void',
              'x-component': 'View',
              'x-component-props': {
                style: { margin: 16 },
              },
              properties: {
                submit: {
                  type: 'void',
                  'x-component': 'Button',
                  'x-component-props': {
                    block: true,
                    type: 'primary',
                    children: '登录',
                    formType: 'submit',
                  },
                },
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
