
import { observer } from '@formily/react';
import { useRoot } from '@yimoko/store';
import { Page, StorePage, StorePageProps } from '@yimoko/taro';

const IndexPage = observer(() => {
  const { loading } = useRoot();

  console.log('root loading', loading);

  const props: StorePageProps = {
    store: { api: {}, defaultValues: { v1: false } },
    options: {},
    schema: {
      type: 'object',
      properties: {
        d1: {
          type: 'void',
          'x-component': 'Divider',
          'x-component-props': {
            contentPosition: 'center',
            children: '基本用法 受控',
          },
        },
        v1: {
          'x-component': 'Overlay',
          'x-component-props': {
            title: 'Overlay',
            message: 'message',
            children: 'children',
          },
          properties: {
            c: {
              type: 'void',
              'x-component': 'Text',
              'x-component-props': {
                children: '受控模式下的内容',
              },
            },
          },
        },
        checkbox: {
          type: 'void',
          'x-component': 'View',
          properties: {
            v1: {
              'x-component': 'Checkbox',
              'x-component-props': { children: '是否展示' },
            },
          },
        },
        d2: {
          type: 'void',
          'x-component': 'Divider',
          'x-component-props': {
            contentPosition: 'center',
            children: '非受控',
          },
        },
        v2: {
          type: 'void',
          'x-component': 'Overlay',
          'x-component-props': {
            button: { children: '非受控' },
          },
        },
        d3: {
          type: 'void',
          'x-component': 'Divider',
          'x-component-props': {
            contentPosition: 'center',
            children: '嵌入内容',
          },
        },
        v3: {
          type: 'void',
          'x-component': 'Overlay',
          'x-component-props': {
            cancelText: '取消',
            message: 'message',
            button: {
              children: '嵌入内容',
              type: 'primary',
            },
          },
          properties: {
            b: {
              type: 'void',
              'x-component': 'Text',
              'x-component-props': {
                children: '嵌入内容',
                type: 'info',
              },
            },
          },
        },
      },
    },
  };

  console.log(JSON.stringify(props));

  // @ts-ignore
  return <Page><StorePage {...props} /></Page>;
});

export default IndexPage;
