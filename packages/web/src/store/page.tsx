import { IFormProps } from '@formily/core';
import { SchemaReactComponents, ISchema, observer } from '@formily/react';
import { BaseStore, StoreMap, IStore, IStoreConfig, IStoreValues, useAPIExecutor, StoreDict } from '@yimoko/store';
import { useMemo } from 'react';

import { SchemaPage } from '../schema/page';

export interface StorePageProps<V extends object = IStoreValues, R = IStoreValues> extends React.HTMLAttributes<HTMLDivElement> {
  store: IStore<V, R> | IStoreConfig<V, R>;
  options?: Omit<IFormProps<any>, 'values' | 'initialValues'>,
  components?: SchemaReactComponents;
  scope?: any;
  schema?: ISchema
}

function StorePageFn<V extends object = IStoreValues, R = IStoreValues>(props: StorePageProps<V, R>) {
  const { store, options, scope, ...args } = props;
  const apiExecutor = useAPIExecutor();
  const curStore = useMemo(() => {
    if (store instanceof BaseStore) {
      return store;
    }
    const { type = 'base', ...args } = store;
    return new StoreMap[type]({ apiExecutor, ...args });
  }, [apiExecutor, store]);

  const { defaultValues, values } = curStore;

  return <>
    <SchemaPage options={{ ...options, values, initialValues: defaultValues }} scope={{ ...scope, curStore }}  {...args} />;
    <StoreDict store={curStore} />
  </>;
}

export const StorePage = observer(StorePageFn);
