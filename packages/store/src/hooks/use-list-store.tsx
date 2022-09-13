import { useState } from 'react';

import { useAPIExecutor } from '../context/api';
import { IStoreValues } from '../store/base';
import { IListStoreConfig, ListStore } from '../store/list';

export function useListStore<V extends object = IStoreValues, R = IStoreValues>(config: IListStoreConfig<V, R>) {
  const apiExecutor = useAPIExecutor();
  const [store] = useState<ListStore<V, R>>(() => new ListStore<V, R>({ apiExecutor, ...config }));
  return store;
}
