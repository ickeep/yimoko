import { useState } from 'react';

import { IStoreValues } from '../store/base';
import { useAPIExecutor } from '../store/config';
import { IListStoreConfig, ListStore } from '../store/list';

export function useListStore<V extends object = IStoreValues, R extends object = any>(config: IListStoreConfig<V, R>) {
  const apiExecutor = useAPIExecutor();
  const [store] = useState<ListStore<V, R>>(() => new ListStore<V, R>({ apiExecutor, ...config }));
  return store;
}
