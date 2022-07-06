import { observer, useExpressionScope } from '@formily/react';

import { BaseStore } from '../store/base';

import { RedirectValues } from './redirect-values';

export const RedirectListData = observer(() => {
  const values = useListData();
  return <RedirectValues values={values} />;
});

export const useListData = (store?: BaseStore<any, any>) => {
  const scope = useExpressionScope();
  const { curStore = {} } = scope;
  const { response } = store ?? curStore;
  const values = Array.isArray(response?.data) ? response.data : (response?.data?.data ?? []);
  return values;
};
