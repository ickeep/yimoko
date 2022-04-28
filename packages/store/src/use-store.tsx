import { useState } from 'react';

import { BaseStore, IStoreConfig, IStoreValues } from './base';

export function useStore<V extends object = IStoreValues, R = IStoreValues>(config: IStoreConfig<V, R>) {
  const [store] = useState<BaseStore<V, R>>(() => new BaseStore(config));
  return store;
}

