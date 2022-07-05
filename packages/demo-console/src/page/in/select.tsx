import { observer } from '@formily/react';
import { Select } from '@yimoko/web';

export const App = observer(() => (
  <div className="App">
    <Select style={{ width: 220 }}
      keys={{ value: 'value', lable: 'lable' }}
      searchConfig={{ request: { value: 'id' } }}
      apiType="search" api={{ url: '/api/data/options' }} labelAPI />
  </div>
));
