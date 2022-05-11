import { BaseStore } from '@yimoko/store';
import { IStoreValues, IStoreConfig } from '@yimoko/store/types/base';
import { httpRequest } from '@yimoko/taro';
import { useState } from 'react';

export function useStore<V extends object = IStoreValues, R = IStoreValues>(config: IStoreConfig<V, R>) {
  const [store] = useState<BaseStore<V, R>>(() => {
    const cur = new BaseStore(config);
    // @ts-ignore
    cur.apiExecutor = httpRequest;
    return cur;
  });

  return store;
}

// export class BaseStore {
//   values: Record<string, any> = {};
//   constructor({ defaultValues }: { defaultValues: Record<string, any> }) {
//     this.values = { ...defaultValues };
//     define(this, {
//       values: observable,
//       setValues: action,
//     });
//   }
//   setValues = (values: Record<string, any>) => this.values = values;
// }
