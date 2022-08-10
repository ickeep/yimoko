
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
          'x-component': 'ActionSheet',
          'x-component-props': {
            title: '选择',
            options: [
              {
                name: '选项一',
                desc: '描述',
                color: 'red',
              },
              {
                name: '选项二',
                desc: '禁用',
                disabled: true,
              },
              {
                name: '选项三',
                desc: 'loading',
                loading: true,
              },
              {
                name: '选项四',
                desc: '微信开放能力 - 分享',
                openType: 'share',
              },
            ],
          },
        },
        checkbox: {
          type: 'void',
          'x-component': 'View',
          properties: {
            v1: {
              'x-component': 'Checkbox',
              'x-component-props': {
                children: '是否展示',
              },
            },
          },
        },
        d2: {
          type: 'void',
          'x-component': 'Divider',
          'x-component-props': {
            contentPosition: 'center',
            children: '取消',
          },
        },
        v2: {
          type: 'void',
          'x-component': 'ActionSheet',
          'x-component-props': {
            cancelText: '取消',
            button: {
              children: '选择',
            },
            options: [
              {
                name: '选项一',
              },
              {
                name: '选项二',
              },
            ],
          },
        },
        d3: {
          type: 'void',
          'x-component': 'Divider',
          'x-component-props': {
            contentPosition: 'center',
            children: '按钮属性',
          },
        },
        v3: {
          type: 'void',
          'x-component': 'ActionSheet',
          'x-component-props': {
            cancelText: '取消',
            button: {
              children: '选择',
              type: 'primary',
            },
            options: [
              {
                name: '选项一',
              },
              {
                name: '选项二',
              },
            ],
          },
        },
        d4: {
          type: 'void',
          'x-component': 'Divider',
          'x-component-props': {
            contentPosition: 'center',
            children: 'children',
          },
        },
        v4: {
          type: 'void',
          'x-component': 'ActionSheet',
          'x-component-props': {
            cancelText: '取消',
            button: {
              children: '选择',
              type: 'primary',
            },
            options: [
              {
                name: '选项一',
              },
              {
                name: '选项二',
              },
            ],
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
      },
    },
  };

  console.log(JSON.stringify(props));

  // @ts-ignore
  return <Page><StorePage {...props} /></Page >;
});

export default IndexPage;
