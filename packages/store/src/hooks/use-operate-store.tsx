import { useState } from 'react';

import { IStoreValues } from '../store/base';
import { useAPIExecutor, useNotifier } from '../store/config';
import { IOperateStoreConfig, OperateStore } from '../store/operate';

export function useOperateStore<V extends object = IStoreValues, R extends object = any>(config: IOperateStoreConfig<V, R>) {
  const apiExecutor = useAPIExecutor();
  const notifier = useNotifier();
  const [store] = useState<OperateStore<V, R>>(() => new OperateStore<V, R>({ apiExecutor, notifier, ...config }));
  return store;
}
