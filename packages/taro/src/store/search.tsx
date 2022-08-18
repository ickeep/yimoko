import { observer } from '@formily/react';
import { useRouter } from '@tarojs/taro';
import { IStore, useStoreSearch } from '@yimoko/store';

// 使用 hook 会导致使用页面因为 search 而重新渲染，使用组件，则可将影响范围限制在本组件中
export const StoreSearch = observer(({ store }: { store: IStore }) => {
  const router = useRouter();
  useStoreSearch(store, router?.params ?? '');
  return null;
});
