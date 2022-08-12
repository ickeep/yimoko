
import { observer } from '@formily/react';
import { useRoot } from '@yimoko/store';
import { Page, StorePage, StorePageProps } from '@yimoko/taro';

const IndexPage = observer(() => {
  const { loading } = useRoot();

  console.log('root loading', loading);


  const props: StorePageProps = {
    store: { api: {}, defaultValues: { v2: 0 } },
    options: {},
    schema: {
      type: 'object',
      properties: {
        d1: {
          type: 'void',
          'x-component': 'Divider',
          'x-component-props': {
            contentPosition: 'center',
            children: '基本用法',
          },
        },
        v1: {
          type: 'void',
          'x-component': 'Tabs',
          items: [
            {
              type: 'void',
              'x-component': 'Text',
              'x-decorator-props': {
                title: 'Item 1',
              },
              'x-component-props': {
                type: 'success',
                children: 'Item 1 的内容 decorator 为空 component 为 Text',
              },
            },
            {
              type: 'void',
              'x-decorator': 'Tab',
              'x-decorator-props': {
                title: 'Item 2',
              },
              'x-component': 'Text',
              'x-component-props': {
                type: 'info',
                children: 'Item 2 的内容 decorator === Tab',
              },
            },
            {
              type: 'void',
              'x-component': 'Tab',
              'x-component-props': {
                title: 'Item 3',
              },
              properties: {
                t: {
                  'x-component': 'Text',
                  'x-component-props': {
                    type: 'warning',
                    children: 'Item 3 的内容 component === Tab 通过 properties 渲染内容 ',
                  },
                },
              },
            },
          ],
          'x-component-props': {
            options: [
              {
                title: '标签 1',
              },
              {
                title: '标签 2',
                disabled: true,
              },
            ],
          },
        },
        d2: {
          type: 'void',
          'x-component': 'Divider',
          'x-component-props': {
            contentPosition: 'center',
            children: '受控',
          },
        },
        v2: {
          'x-component': 'Tabs',
          'x-component-props': {

            options: [
              {
                title: '标签 1',
                name: '1',
                children: '标签 1 内容',
              },
              {
                title: '标签 2',
                name: '2',
                children: '标签 2 内容',
              },
              {
                title: '标签 3',
                name: '3',
                children: '标签 3 内容',
              },
            ],
          },
        },
        c: {
          type: 'void',
          'x-component': 'View',
          'x-component-props': {
            style: { marginTop: 10 },
          },
          properties: {
            v2: {
              type: 'string',
              'x-component': 'RadioGroup',
              'x-component-props': {
                options: [
                  {
                    label: '设置为 1',
                    value: '1',
                  },
                  {
                    label: '设置为 2',
                    value: '2',
                  },
                  {
                    label: '设置为 3',
                    value: '3',
                  },
                ],
              },
            },
          },
        },
        d3: {
          type: 'void',
          'x-component': 'Divider',
          'x-component-props': {
            contentPosition: 'center',
            children: '通过 schema 渲染 dataSource 数据',
          },
        },
        v3: {
          'x-component': 'Tabs',
          'x-component-props': {
            dataSource: {
              object: {
                text: 'text',
                desc: 'desc',
                btn: 'btn',
              },
              v2: {
                text: 'text 2',
                desc: 'desc 2',
                btn: 'btn 2',
              },
            },
            options: [
              {
                title: 'object',
                name: 'object',
                schema: {
                  type: 'object',
                  properties: {
                    text: {
                      'x-component': 'Text',
                    },
                    desc: {
                      type: 'void',
                      'x-component': 'View',
                      properties: {
                        desc: {
                          'x-component': 'Text',
                        },
                      },
                    },
                    btn: { 'x-component': 'Button' },
                  },
                },
              },
              {
                title: '标签 2',
                name: 'v2',
                schema: {
                  type: 'object',
                  properties: {
                    text: {
                      'x-component': 'Text',
                    },
                    desc: {
                      type: 'void',
                      'x-component': 'View',
                      properties: {
                        desc: {
                          'x-component': 'Text',
                        },
                      },
                    },
                    btn: { 'x-component': 'Button' },
                  },
                },
              },
              {
                title: '标签 3',
                name: '3',
              },
            ],
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
