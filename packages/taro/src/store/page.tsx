import { createForm, IFormProps } from '@formily/core';
import { SchemaReactComponents, ISchema, observer } from '@formily/react';
import { IStore, IStoreConfig, IStoreValues, StoreDict, SchemaPage, useStore, useRoot, useConfig } from '@yimoko/store';
import { useMemo, ReactElement } from 'react';

import { IConfig } from './config';

import { StoreSearch } from './search';

export interface StorePageProps<V extends object = IStoreValues, R = IStoreValues> extends React.HTMLAttributes<HTMLDivElement> {
  store: IStore<V, R> | IStoreConfig<V, R>;
  options?: Omit<IFormProps<any>, 'values' | 'initialValues'>,
  components?: SchemaReactComponents;
  scope?: any;
  schema?: ISchema
}

// eslint-disable-next-line max-len
export const StorePage: <V extends object = IStoreValues, R = IStoreValues>(props: StorePageProps<V, R>) => ReactElement | null = observer((props) => {
  const { store, options, scope, ...args } = props;
  const rootStore = useRoot();
  const configStore = useConfig<IConfig>();
  const curStore = useStore(store);
  const model = useMemo(() => createForm({ ...options, values: curStore.values, initialValues: curStore.defaultValues }), [curStore, options]);
  const curScope = useMemo(() => ({ ...scope, curStore, rootStore, configStore }), [configStore, curStore, rootStore, scope]);

  return (
    <>
      <SchemaPage model={model} scope={curScope}  {...args} />
      <StoreDict store={curStore} />
      <StoreSearch store={curStore} />
    </>
  );
});

