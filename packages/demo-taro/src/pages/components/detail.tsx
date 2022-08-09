import Taro from '@tarojs/taro';

import { observer } from '@formily/react';
import { useBaseStore } from '@yimoko/store';
import { Page, StorePage } from '@yimoko/taro';
import { useEffect } from 'react';

export default observer(() => {
  const { router } = Taro.getCurrentInstance();
  const { name = '' } = router?.params ?? {};
  const store = useBaseStore<any, any>({ api: { url: '' } });

  useEffect(() => {
    if (name) {
      store.api = { url: `/component/detail/${name}.json` };
      store.runAPI();
    }
  }, [name, store]);

  const { page, ...args } = store.response?.data ?? {};
  return (
    <Page {...page} store={store}><StorePage {...args} /></Page>
  );
});
