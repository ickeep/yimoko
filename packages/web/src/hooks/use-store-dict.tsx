import { useEffect } from 'react';

import { IStore } from '../store';

export const useStoreDict = (store: IStore) => {
  const { dictConfig } = store;
  useEffect(() => {
    dictConfig?.forEach((conf) => {
      const { field, type } = conf;
      if (type !== 'by') {
        const { data, api } = conf;
        store.setDictByField(field, data);
      }
    });
  }, [dictConfig, store]);
};
