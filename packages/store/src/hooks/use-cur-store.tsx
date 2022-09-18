import { useExpressionScope } from '@formily/react';

import { IStore } from '../store';

export const useCurStore = <T extends IStore = IStore>(store?: T) => {
  const scope = useExpressionScope() as { curStore?: T };
  return store ?? scope?.curStore;
};
