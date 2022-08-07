import { observer } from '@formily/react';
import { RadioGroup, Radio, StorePage } from '@yimoko/taro';

const IndexPage = observer(() => (
  <>
    <RadioGroup>
      <Radio name='a'>a</Radio>
      <Radio name='b'>b</Radio>
    </RadioGroup>
    <StorePage
      store={{ api: {}, isBindSearch: true, defaultValues: { icon: 'star', r1: '', r2: '2' } }}
      options={{}}
      schema={{
        type: 'object',
        properties: {
          r1: {
            'x-component': 'RadioGroup',
            'x-component-props': {
              options: [
                { label: '一', value: '1' },
                { label: '二', value: '2' },
              ],
            },
          },
          r2: {
            'x-component': 'RadioGroup',
            'x-component-props': {
              direction: 'horizontal',
              valueType: 'string',
              options: [
                { label: '一', value: '1' },
                { label: '二', value: '2' },
              ],
            },
            items: [
              { 'x-component': 'Radio', 'x-component-props': { children: '三', name: '3' } },
            ],
            properties: {
              rv4: {
                type: 'void',
                'x-component': 'Radio',
                'x-component-props': {
                  children: '四',
                  name: '4',
                },
              },
            },
          },
        },
      }}
    />
  </>
));

export default IndexPage;
