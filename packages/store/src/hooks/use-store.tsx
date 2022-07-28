import { useMemo } from 'react';

import { useAPIExecutor } from '../context/api';
import { IStore, IStoreConfig, StoreMap } from '../store';
import { IStoreValues, BaseStore } from '../store/base';

export function useStore<V extends object = IStoreValues, R = IStoreValues>(store: IStore<V, R> | IStoreConfig<V, R>) {
  const apiExecutor = useAPIExecutor();
  const curStore = useMemo(() => {
    if (store instanceof BaseStore) {
      return store;
    }
    const { type = 'base', ...args } = store;
    return new StoreMap[type]({ apiExecutor, ...args });
  }, [apiExecutor, store]);

  return curStore;
}
