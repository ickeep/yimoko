import { observer, useExpressionScope } from '@formily/react';

import { ListStore } from '../store/list';

import { RedirectValues } from './redirect-values';

export const RedirectListData = observer(() => {
  const values = useListData();

  return <RedirectValues values={values} />;
});

export const useListData = (store?: ListStore<any, any>) => {
  const scope = useExpressionScope();
  const { curStore = {} } = scope;
  const { listData } = store ?? curStore;
  return listData;
};
