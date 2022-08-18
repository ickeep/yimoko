
import { useAPIExecutor } from '../context/api';
import { IStore, IStoreConfig, StoreMap } from '../store';
import { IStoreValues, BaseStore } from '../store/base';

import { useDeepMemo } from './use-deep-memo';

export function useStore<V extends object = IStoreValues, R = IStoreValues>(store: IStore<V, R> | IStoreConfig<V, R>) {
  const apiExecutor = useAPIExecutor();
  const curStore = useDeepMemo(() => {
    if (store instanceof BaseStore) {
      if (!store.apiExecutor) {
        // eslint-disable-next-line no-param-reassign
        store.apiExecutor = apiExecutor;
      }
      return store;
    }
    const { type = 'base', ...args } = store;
    return new StoreMap[type]({ apiExecutor, ...args });
  }, [apiExecutor, store]);

  return curStore;
}
