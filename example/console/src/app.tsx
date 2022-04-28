import { observer } from '@formily/reactive-react';
import { useStore } from '@yimoko/web';
import { Button } from 'antd';

export const App = observer(() => {
  const store = useStore({ defaultValues: getValue(), api: { url: '' } });
  const { dict, values, setValues, setDict, runAPI } = store;
  console.log(store);

  return (
    <div className="App">
      <h3>{values.id}</h3>
      <p>dict {dict.name}</p>
      <Button onClick={() => {
        runAPI();
        setDict({ name: 'dict-name' });
        setValues({ name: `${Math.random()}`, id: values.id += 1 });
      }
      } >{values.name}</Button>
    </div>
  );
});


const getValue = () => {
  console.log('getValue');

  return { name: 'name', id: 0 };
};
