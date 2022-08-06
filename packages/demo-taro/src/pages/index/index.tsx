import { observer } from '@formily/react';
import { StorePage } from '@yimoko/taro';

const IndexPage = observer(() => (
  <StorePage
    store={{ api: {}, isBindSearch: true, defaultValues: { icon: 'star', value: '' } }}
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
      },
    }}
  />
));

export default IndexPage;
