import { createForm, IFormProps } from '@formily/core';
import { SchemaReactComponents, ISchema, observer } from '@formily/react';
import { IStore, IStoreConfig, IStoreValues, StoreDict, SchemaPage, useStore, useRoot, useConfig, useBoxBindContentStore } from '@yimoko/store';
import { useMemo } from 'react';

import { IConfig } from './config';
import { StoreSearch } from './search';

export interface StorePageProps<V extends object = IStoreValues, R extends object = any> extends React.HTMLAttributes<HTMLDivElement> {
  store: IStore<V, R> | IStoreConfig<V, R>;
  options?: Omit<IFormProps<any>, 'values' | 'initialValues'>,
  components?: SchemaReactComponents;
  scope?: any;
  schema?: ISchema
  isBoxContent?: boolean
}

export const StorePage: <V extends object = IStoreValues, R extends object = any>(props: StorePageProps<V, R>) => React.ReactElement | null = observer((props) => {
  const { store, options, scope, isBoxContent, ...args } = props;
  const rootStore = useRoot();
  const configStore = useConfig<IConfig>();
  const curStore = useStore(store);
  const model = useMemo(() => createForm({ ...options, values: curStore.values, initialValues: curStore.defaultValues }), [curStore, options]);
  const curScope = useMemo(() => ({ ...scope, curStore, rootStore, configStore }), [configStore, curStore, rootStore, scope]);

  useBoxBindContentStore(curStore, isBoxContent);

  return (
    <>
      <SchemaPage model={model} scope={curScope} {...args} />
      <StoreDict store={curStore} />
      <StoreSearch store={curStore} />
    </>
  );
});

