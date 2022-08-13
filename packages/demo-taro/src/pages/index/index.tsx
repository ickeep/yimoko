
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
        v2: {
          'x-component': 'Cardlist',
          'x-component-props': {
            options: [
              {
                tag: '标签',
                desc: '描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息',
                title: '商品标题',
                currency: 'currency',
                thumb: 'https://static-ickeep-1251135819.cos.ap-guangzhou.myqcloud.com/demo-taro/img/t1.jpg',
              },
              {
                thumb: 'https://static-ickeep-1251135819.cos.ap-guangzhou.myqcloud.com/demo-taro/img/t2.jpg',
                desc: '描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息',
                title: '商品标题',
              },
              {
                thumb: 'https://static-ickeep-1251135819.cos.ap-guangzhou.myqcloud.com/demo-taro/img/t3.jpg',
                desc: '描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息',
                title: '商品标题',
              },
            ],
          },
          // items: [
          //   {
          //     type: 'void',
          //     'x-component': 'Text',
          //     'x-component-props': {
          //       children: 'Item 1',
          //       type: 'success',
          //     },
          //     'x-decorator-props': {
          //       icon: 'contact',
          //     },
          //   },
          // ],
        },
      },
    },
  };

  console.log(JSON.stringify(props));

  // @ts-ignore
  return <Page> <StorePage {...props} /></Page >;
});

export default IndexPage;
