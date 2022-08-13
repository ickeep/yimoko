
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
        v2: 0,
      },
    },
    options: {},
    schema: {
      type: 'object',
      properties: {
        d2: {
          type: 'void',
          'x-component': 'Divider',
          'x-component-props': {
            contentPosition: 'center',
            children: '受控',
          },
        },
        v2: {
          'x-component': 'Tabbar',
          'x-component-props': {
            options: [
              {
                children: '标签 1',
                name: '1',
                icon: 'home-o',
                dot: 2,
              },
              {
                children: '标签 2',
                name: '2',
                img: 'https://static-ickeep-1251135819.cos.ap-guangzhou.myqcloud.com/demo-taro/icon/discovery.png',
                imgActive: 'https://static-ickeep-1251135819.cos.ap-guangzhou.myqcloud.com/demo-taro/icon/discovery-active.png',
              },
              {
                children: '标签 3',
                name: '3',
                icon: 'like',
              },
            ],
          },
          items: [
            {
              type: 'void',
              'x-component': 'Text',
              'x-component-props': {
                children: 'Item 1',
                type: 'success',
              },
              'x-decorator-props': {
                icon: 'contact',
              },
            },
          ],
        },
        c: {
          type: 'void',
          'x-component': 'View',
          'x-component-props': {
            style: {
              marginTop: 10,
            },
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
      },
    },
  };

  console.log(JSON.stringify(props));

  // @ts-ignore
  return <Page> <StorePage {...props} /></Page >;
});

export default IndexPage;
