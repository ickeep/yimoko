import { useExpressionScope, useForm } from '@formily/react';
import { useState } from 'react';

import { useAPIExecutor } from '../context/api';
import { IStoreValues } from '../store/base';
import { useNotifier } from '../store/config';
import { IOperateStoreConfig, OperateStore } from '../store/operate';

export function useOperateStore<V extends object = IStoreValues, R = IStoreValues>(config: IOperateStoreConfig<V, R>) {
  const apiExecutor = useAPIExecutor();
  const form = useForm();
  const scope = useExpressionScope();
  const notifier = useNotifier();
  const [store] = useState<OperateStore<V, R>>(() => new OperateStore<V, R>({ apiExecutor, notifier, form, scope, ...config }));
  return store;
}
