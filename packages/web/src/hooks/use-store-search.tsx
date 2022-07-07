import { IStore, useStoreSearch } from '@yimoko/store';
import { useLocation } from 'react-router-dom';


export const useStoreSearchWeb = (store: IStore) => {
  const { search } = useLocation();
  useStoreSearch(store, search);
};
