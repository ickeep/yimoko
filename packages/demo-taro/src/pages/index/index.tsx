
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
            children: '加载类型',
          },
        },
        v2: {
          type: 'void',
          'x-component': 'Overlay',
          'x-component-props': {
            type: 'spinner',
          },

        },
        d3: {
          type: 'void',
          'x-component': 'Divider',
          'x-component-props': {
            contentPosition: 'center',
            children: '加载文案',
          },
        },
        v3: {
          type: 'void',
          'x-component': 'Overlay',
          'x-component-props': {
            cancelText: '取消',
            message: 'message',
            button: {
              children: '弹出',
              type: 'primary',
            },
          },
          properties: {
            b: {
              type: 'void',
              'x-component': 'Text',
              'x-component-props': {
                children: '加载中',
                type: 'info',
              },
            },
          },
        },
        d4: {
          type: 'void',
          'x-component': 'Divider',
          'x-component-props': {
            contentPosition: 'center',
            children: '自定义颜色',
          },
        },
        v4: {
          type: 'void',
          'x-component': 'Overlay',
          'x-component-props': {
            color: '#1989fa',
          },
          properties: {
            children: {
              type: 'void',
              'x-component': 'Text',
              'x-component-props': {
                children: 'Text',
                type: 'primary',
              },
            },
          },
        },
        d5: {
          type: 'void',
          'x-component': 'Divider',
          'x-component-props': {
            contentPosition: 'center',
            children: '垂直排列',
          },
        },
        v5: {
          type: 'void',
          'x-component': 'Overlay',
          'x-component-props': {
            vertical: true,
            children: '加载中',
          },

        },
      },
    },
  };

  // console.log(JSON.stringify(props));

  // @ts-ignore
  return <Page><StorePage {...props} /></Page>;
});

export default IndexPage;
