
import { observer } from '@formily/react';
import { Page, StorePage } from '@yimoko/taro';

const IndexPage = observer(() => (
  <Page>
    <StorePage
      store={{ api: {}, isBindSearch: true, defaultValues: { v1: 4, v2: 2, v3: 4, v4: 50, v5: 0, v6: 5, v7: 10, v8: 20, v9: 30 } }}
      options={{}}
      schema={{
        type: 'object',
        properties: {
          d1: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '基本用法' } },
          v1: {
            'x-component': 'Stepper',
          },
          d2: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '步长设置' } },
          v2: {
            'x-component': 'Stepper',
            'x-component-props': { step: 2 },
          },

          d3: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '限制输入范围' } },
          v3: {
            'x-component': 'Stepper',
            'x-component-props': { min: -5, max: 5 },
          },
          d4: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '限制输入整数' } },
          v4: {
            'x-component': 'Stepper',
            'x-component-props': { integer: true },
          },
          d5: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '禁用' } },
          v5: {
            'x-component': 'Stepper',
            'x-component-props': { disabled: true },
          },


          d6: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '关闭长按' } },
          v6: {
            'x-component': 'Stepper',
            'x-component-props': { longPress: false },
          },
          d7: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '固定小数位数' } },
          v7: {
            'x-component': 'Stepper',
            'x-component-props': { decimalLength: 1 },
          },
          d8: { type: 'void', 'x-component': 'Divider', 'x-component-props': { contentPosition: 'center', children: '自定义大小' } },
          v8: {
            'x-component': 'Stepper',
            'x-component-props': { inputWidth: '40px', buttonSize: '32px' },
          },
        },
      }}
    />
  </Page>
));

export default IndexPage;
