
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
          'x-component': 'Sidebar',
          items: [
            {
              type: 'void',
              'x-component': 'Text',
              'x-component-props': {
                type: 'info',
                children: '来看看',
              },
            },
            {
              type: 'void',
              'x-decorator': 'SidebarItem',
              'x-decorator-props': {
                name: '123',
              },
              'x-component': 'Text',
              'x-component-props': {
                type: 'info',
                children: 'decorator',
              },
            },
            {
              type: 'void',
              'x-component': 'SidebarItem',
              'x-component-props': {
                title: 'component',
              },
            },
          ],
          'x-component-props': {
            options: [
              {
                title: '标签 1',
                desc: ' info ',
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
          'x-component': 'Sidebar',

          'x-component-props': {
            accordion: true,
            options: [
              {
                title: '标签 1',
              },
              {
                title: '标签 2',
              },
              {
                title: '标签 3',
              },
            ],
          },
        },
        c: {
          type: 'void',
          'x-component': 'View',
          properties: {
            v2: {
              type: 'string',
              'x-component': 'RadioGroup',
              'x-component-props': {
                options: [
                  {
                    label: '展开1',
                    value: 0,
                  },
                  {
                    label: '展开2',
                    value: 1,
                  },
                  {
                    label: '展开3',
                    value: 2,
                  },
                ],
              },
            },
          },
        },
      },
    },
  };

  console.log(JSON.stringify(props));

  // @ts-ignore
  return <Page> <StorePage {...props} /></Page >;
});

export default IndexPage;
