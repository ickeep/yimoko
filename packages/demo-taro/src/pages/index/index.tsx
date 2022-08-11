
import { observer } from '@formily/react';
import { useRoot } from '@yimoko/store';
import { Page, StorePage, StorePageProps } from '@yimoko/taro';

const IndexPage = observer(() => {
  const { loading } = useRoot();

  console.log('root loading', loading);

  const props: StorePageProps = {
    store: { api: {}, defaultValues: { v2: '' } },
    options: {},
    schema: {
      type: 'object',
      properties: {
        d1: {
          type: 'void',
          'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '基本用法' },
        },
        v1: {
          type: 'void', 'x-component': 'NavBar',
          'x-component-props': {
            leftArrow: true,
            leftText: '返回',
            title: 'NavBar',
          },
        },
      },
    },
  };

  console.log(JSON.stringify(props));

  // @ts-ignore
  return <Page > <StorePage {...props} /></Page>;
});

export default IndexPage;
