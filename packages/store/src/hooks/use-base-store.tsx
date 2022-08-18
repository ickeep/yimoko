import { useState } from 'react';

import { useAPIExecutor } from '../context/api';
import { BaseStore, IBaseStoreConfig, IStoreValues } from '../store/base';

export function useBaseStore<V extends object = IStoreValues, R = IStoreValues>(config: IBaseStoreConfig<V, R>) {
  const api = useAPIExecutor();
  const [store] = useState<BaseStore<V, R>>(() => {
    const cur = new BaseStore<V, R>({ apiExecutor: api, ...config });
    return cur;
  });

  return store;
}
