
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
          type: 'void', 'x-component': 'IndexBar',
          'x-component-props': {
            options: [
              { index: 'A', child: ['A -1', { title: 'A-2' }, { title: 'A-3' }, 'A-4', 'A-5'] },
              { index: 'B', child: ['B-1', { title: 'B-2' }, { title: 'B-3' }, 'B-4', 'B-5'] },
              { index: 'C', child: ['C-1', { title: 'C-2' }, { title: 'C-3' }, 'C-4', 'C-5'] },
              { index: 'D', child: ['D-1', { title: 'D-2' }, { title: 'D-3' }, 'D-4', 'D-5'] },
              { index: 'E', child: ['E-1', { title: 'E-2' }, { title: 'E-3' }, 'E-4', 'E-5'] },
              { index: 'F', child: ['F-1', { title: 'F-2' }, { title: 'F-3' }, 'F-4', 'F-5'] },
              { index: 'G', child: ['G-1', { title: 'G-2' }, { title: 'G-3' }, 'G-4', 'G-5'] },
            ],
            indexList: ['H', 'I'],
          },
          items: [
            {
              type: 'void',
              'x-component': 'Block',
              properties: {
                i: {
                  type: 'void',
                  'x-component': 'IndexAnchor',
                  'x-component-props': { index: 'H' },
                },
                c1: {
                  type: 'void',
                  'x-component': 'Cell',
                  'x-component-props': { title: 'H-1' },
                },
                T1: {
                  type: 'void',
                  'x-component': 'Text',
                  'x-component-props': { type: 'danger', style: { height: 400, display: 'block' }, children: 'h-danger' },
                },
              },
            },
            {
              type: 'void',
              'x-component': 'Block',
              properties: {
                i: {
                  type: 'void',
                  'x-component': 'IndexAnchor',
                  'x-component-props': { index: 'I' },
                },
                c1: {
                  type: 'void',
                  'x-component': 'Cell',
                  'x-component-props': { title: 'I-1' },
                },
                T1: {
                  type: 'void',
                  'x-component': 'Text',
                  'x-component-props': { type: 'danger', style: { height: 400, display: 'block' }, children: 'I-danger' },
                },
              },
            },
          ],
        },
      },
    },
  };

  console.log(JSON.stringify(props));

  // @ts-ignore
  return <Page > <StorePage {...props} /></Page>;
});

export default IndexPage;
