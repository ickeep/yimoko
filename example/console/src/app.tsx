
import { observer } from '@formily/reactive-react';
import { useStore } from '@yimoko/store';
import { Button } from 'antd';


export const App = observer(() => {
  const store = useStore({ defaultValues: { name: 'name', id: 0 }, api: { url: '' } });
  const { dict, values, setValues, setDict, fetchData } = store;
  console.log(store);

  return (
    <div className="App">
      <h3>{values.id}</h3>
      <p>dict {dict.name}</p>
      <Button onClick={() => {
        fetchData();
        setDict({ name: 'dict-name' });
        setValues({ name: `${Math.random()}`, id: values.id += 1 });
      }
      } >{values.name}</Button>
    </div>
  );
});
