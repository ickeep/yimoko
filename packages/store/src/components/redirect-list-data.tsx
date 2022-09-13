import { IFormProps } from '@formily/core';
import { observer, useExpressionScope } from '@formily/react';
import { ReactNode } from 'react';

import { ListStore } from '../store/list';

import { RedirectValues } from './redirect-values';

export interface RedirectListDataProps extends Omit<IFormProps, 'values'> {
  children: ReactNode;
}

export const RedirectListData = observer((props: RedirectListDataProps) => {
  const { children, ...args } = props;
  const values = useListData();
  return <RedirectValues {...args} values={values} />;
});

export const useListData = (store?: ListStore<any, any>) => {
  const scope = useExpressionScope() ?? {};
  const { curStore = {} } = scope;
  const { listData } = store ?? curStore;
  return listData;
};
