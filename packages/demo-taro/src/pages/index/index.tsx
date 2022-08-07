import { observer } from '@formily/react';
import { StorePage } from '@yimoko/taro';

const IndexPage = observer(() => (
  <StorePage
    store={{ api: {}, isBindSearch: true, defaultValues: { icon: 'star', c1: '', c2: 0, cg: [], cg2: '' } }}
    options={{}}
    schema={{
      type: 'object', properties: {
        icon: {
          'x-component': 'Icon',
          'x-component-props': {
            name: 'search',
          },
        },
        icon1: {
          'x-component': 'Icon',
          'x-component-props': {
            name: 'search',
          },
        },
        value: {
          'x-component': 'Icon',
          'x-component-props': {
            name: 'question',
          },
        },
        c1: {
          'x-component': 'Checkbox',
          'x-component-props': { children: 'bool' },
        },
        c2: {
          'x-component': 'Checkbox',
          'x-component-props': { values: { true: 1, false: 0 }, children: 'num' },
        },
        cg: {
          'x-component': 'CheckboxGroup',
          'x-component-props': {
            options: [
              { label: '一', value: '1' },
              { label: '二', value: '2' },
            ],
          },
        },
        cg2: {
          'x-component': 'CheckboxGroup',
          'x-component-props': {
            valueType: 'string',
            options: [
              { label: '一', value: '1' },
              { label: '二', value: '2' },
            ],
          },
          items: [
            { 'x-component': 'Checkbox', 'x-component-props': { children: '三', name: '3' } },
          ],

        },
      },
    }}
  />
));

export default IndexPage;
