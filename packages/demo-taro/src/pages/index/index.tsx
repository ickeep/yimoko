
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
          type: 'void', 'x-component': 'Collapse',
          items: [
            {
              type: 'void', 'x-decorator-props': { title: 'not Item' },
              'x-component': 'Text', 'x-component-props': { type: 'info', children: '来看看' },
            },
            {
              type: 'void', 'x-decorator': 'CollapseItem',
              'x-decorator-props': { title: 'decorator === Item', name: '123' }, 'x-component': 'Text',
              'x-component-props': { type: 'info', children: 'decorator === Item' },
            },
            { type: 'void', 'x-component': 'CollapseItem', 'x-component-props': { title: 'component === Item', children: '来看看' } },
          ],
          'x-component-props': {
            options: [
              { title: 'options 1', value: 'val 1', desc: '这是一个 options 1 的内容' },
              { title: 'options 2', value: 'val  2', desc: '这是一个 options 2 的内容' },
            ],
          },
        },

        d2: {
          type: 'void',
          'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '受控 手风琴模式' },
        },
        v2: {
          'x-component': 'Collapse',
          items: [
            {
              type: 'void', 'x-decorator-props': { title: 'not Item', name: '3' },
              'x-component': 'Text', 'x-component-props': { type: 'info', children: '来看看' },
            },
          ],
          'x-component-props': {
            accordion: true,
            options: [
              { title: 'options 1', value: 'val 1', desc: '这是一个 options 1 的内容', name: '1' },
              { title: 'options 2', value: 'val  2', desc: '这是一个 options 2 的内容', name: '2' },
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
              'x-component-props': { options: [{ label: '展开1', value: '1' }, { label: '展开2', value: '2' }, { label: '展开3', value: '3' }] },
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
