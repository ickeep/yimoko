import { BaseStore, IBaseStoreConfig, IStoreValues } from '@yimoko/store';
import { useState } from 'react';

import { httpRequest } from '../adapter/http';

export function useStore<V extends object = IStoreValues, R = IStoreValues>(config: IBaseStoreConfig<V, R>) {
  const [store] = useState<BaseStore<V, R>>(() => {
    const cur = new BaseStore<V, R>({ apiExecutor: httpRequest, ...config });
    return cur;
  });

  return store;
}
