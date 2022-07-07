import { observer } from '@formily/react';
import { IStore, useStoreSearch } from '@yimoko/store';
import { useLocation } from 'react-router-dom';

// 使用 hook 会导致使用页面因为 search 而重新渲染，使用组件，则可将影响范围限制在本组件中
export const StoreSearch = observer(({ store }: { store: IStore }) => {
  const { search } = useLocation();
  useStoreSearch(store, search);
  return null;
});
