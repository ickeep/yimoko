import { createForm, IFormProps } from '@formily/core';
import { SchemaReactComponents, ISchema, observer } from '@formily/react';
import { IStore, IStoreConfig, IStoreValues, StoreDict, SchemaBox, SchemaPage, useStore } from '@yimoko/store';
import { useMemo } from 'react';

import { StoreSearch } from './search';

export interface StorePageProps<V extends object = IStoreValues, R = IStoreValues> extends React.HTMLAttributes<HTMLDivElement> {
  store: IStore<V, R> | IStoreConfig<V, R>;
  options?: Omit<IFormProps<any>, 'values' | 'initialValues'>,
  components?: SchemaReactComponents;
  scope?: any;
  schema?: ISchema
}

function StorePageFn<V extends object = IStoreValues, R = IStoreValues>(props: StorePageProps<V, R>) {
  const { store, options, scope, ...args } = props;
  const curStore = useStore(store);
  const model = useMemo(() => createForm({ ...options, values: curStore.values, initialValues: curStore.defaultValues }), [curStore, options]);

  return (
    <SchemaBox model={model} {...args}>
      <SchemaPage model={model} scope={{ ...scope, curStore }}  {...args} />
      <StoreDict store={curStore} />
      <StoreSearch store={curStore} />
    </SchemaBox>
  );
}

export const StorePage = observer(StorePageFn);
