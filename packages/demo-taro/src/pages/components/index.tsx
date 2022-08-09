import { observer } from '@formily/react';
import { useBaseStore } from '@yimoko/store';
import { Page, StorePage } from '@yimoko/taro';

export default observer(() => {
  const store = useBaseStore<any, any>({ api: { url: '/component/list.json' }, isRunNow: true });
  const { page, ...args } = store.response?.data ?? {};
  return (
    <Page {...page} store={store}><StorePage {...args} /></Page>
  );
});
