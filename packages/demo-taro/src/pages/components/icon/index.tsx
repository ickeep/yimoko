import { observer } from '@formily/react';
import { StorePage } from '@yimoko/taro';

const IndexPage = observer(() => (
  <StorePage
    store={{ api: {}, defaultValues: { icon: 'star' } }}
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
      },
    }}
  />
));

export default IndexPage;
