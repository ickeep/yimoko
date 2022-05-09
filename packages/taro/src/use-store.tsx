import { BaseStore } from '@yimoko/store';
import { IStoreValues, IStoreConfig } from '@yimoko/store/types/base';
import { useState } from 'react';

import { httpRequest } from './http';

export function useStore<V extends object = IStoreValues, R = IStoreValues>(config: IStoreConfig<V, R>) {
  const [store] = useState<BaseStore<V, R>>(() => {
    const cur = new BaseStore(config);
    // @ts-ignore
    cur.apiExecutor = httpRequest;
    return cur;
  });

  return store;
}

