import { useState } from 'react';

import { BaseStore, IBaseStoreConfig, IStoreValues } from '../store/base';
import { useAPIExecutor } from '../store/config';

export function useBaseStore<V extends object = IStoreValues, R = IStoreValues>(config: IBaseStoreConfig<V, R>) {
  const apiExecutor = useAPIExecutor();
  const [store] = useState<BaseStore<V, R>>(() => new BaseStore<V, R>({ apiExecutor, ...config }));
  return store;
}
