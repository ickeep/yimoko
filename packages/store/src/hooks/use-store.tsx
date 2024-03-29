
import { useForm, useExpressionScope } from '@formily/react';

import { useAPIExecutor } from '../context/api';
import { IStore, IStoreConfig, StoreMap } from '../store';
import { IStoreValues, BaseStore } from '../store/base';
import { useNotifier } from '../store/config';
import { OperateStore } from '../store/operate';

import { useDeepMemo } from './use-deep-memo';

export function useStore<V extends object = IStoreValues, R = IStoreValues>(store: IStore<V, R> | IStoreConfig<V, R>) {
  const apiExecutor = useAPIExecutor();
  const form = useForm();
  const scope = useExpressionScope();
  const notifier = useNotifier();
  const curStore = useDeepMemo(() => {
    if (store instanceof BaseStore) {
      setValue(store, 'apiExecutor', apiExecutor);
      if (store instanceof OperateStore) {
        setValue(store, 'form', form);
        setValue(store, 'scope', scope);
        setValue(store, 'notifier', notifier);
      }
      return store;
    }
    const { type = 'base', ...args } = store;
    return new StoreMap[type]({ apiExecutor, form, scope, notifier, ...args });
  }, [apiExecutor, store]);

  return curStore;
}

// eslint-disable-next-line no-param-reassign
const setValue = (obj: Record<string, any>, key: string, value: any) => (!obj[key] && value) && (obj[key] = value);
