import { observer } from '@formily/reactive-react';
import { useStore, Select } from '@yimoko/web';
import { Button } from 'antd';

export const App = observer(() => {
  const store = useStore({ defaultValues: { name: 'name', id: 0 }, api: { url: '' } });
  const { dict, values, setValues, setDict, runAPI } = store;

  return (
    <div className="App">
      <h3>{values.id}</h3>
      <p>dict {dict.name}</p>
      <Button onClick={() => {
        runAPI();
        setDict({ name: `${Math.random()}` });
        setValues({ name: `${Math.random()}`, id: values.id += 1 });
      }
      } >{values.name}</Button>

      <Select style={{ width: 220 }}
        keys={{ value: 'value', lable: 'lable' }}
        searchConfig={{ request: { value: 'id' } }}
        onChange={v => setValues({ name: v })} apiType="search" value={values.name} api={{ url: '/api/data/options' }} labelAPI />
    </div>
  );
});
