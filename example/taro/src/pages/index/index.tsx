import { observer } from '@formily/reactive-react';
import { View, Text, Button } from '@tarojs/components';

import { useStore } from '@yimoko/taro';

import './index.less';


const IndexPage = observer(() => {
  const { values, setValues } = useStore({ defaultValues: { name: 'xxx' }, api: { url: 'www.baidu.com' } });
  // useEffect(() => {
  //   runAPI();
  // }, [runAPI]);

  console.log('index 111', values);
  return (
    <View className='index'>
      <Text>{values.name}</Text>
      <Button onClick={() => {
        setValues({ name: `${Math.random()}` });
        console.log(values);
      }}>btn</Button>
    </View>
  );
});

export default IndexPage;
