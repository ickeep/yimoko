import { IFormProps } from '@formily/core';
import { SchemaReactComponents, ISchema } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { BaseStore, IStoreConfig, IStoreValues } from '@yimoko/store';
import { useMemo } from 'react';

import { SchemaPage } from '../schema/page';

export interface StorePageProps<V extends object = IStoreValues, R = IStoreValues> extends React.HTMLAttributes<HTMLDivElement> {
  store: BaseStore<V, R> | IStoreConfig<V, R>
  options?: Omit<IFormProps<V>, 'values' | 'initialValues'>,
  components?: SchemaReactComponents;
  scope?: any;
  schema?: ISchema
}

function StorePageFn<V extends object = IStoreValues, R = IStoreValues>(props: StorePageProps<V, R>) {
  const { store, options, scope, ...args } = props;
  const curStore = useMemo(() => (store instanceof BaseStore ? store : new BaseStore(store)), [store]);
  const { defaultValues, values } = curStore;

  // @ts-ignore - 忽略类型错误 类型嵌套比较深，都是 extends object
  return <SchemaPage options={{ ...options, values, initialValues: defaultValues }} scope={{ ...scope, curStore }}  {...args} />;
}

export const StorePage = observer(StorePageFn);
