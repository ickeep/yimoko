import { useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';

import { IAPIExecutor, useAPIExecutor } from '../context/api';
import { IAPIRequestConfig, judgeIsSuccess } from '../data/api';
import { IKeys, IOptions, dataToOptions } from '../data/options';

export type IOptionsAPI = IAPIExecutor | IAPIRequestConfig;

export const useAPIOptions = <T extends string = 'label' | 'value'>(
  data?: any, api?: IOptionsAPI, keys?: IKeys<T>, splitter?: string,
): [IOptions<T>, boolean, Dispatch<SetStateAction<IOptions<T>>>] => {
  const [options, setOptions] = useState<IOptions<T>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const apiExecutor = useAPIExecutor();

  const apiFn = useMemo(() => {
    if (!api) {
      return undefined;
    }
    return typeof api === 'function' ? api : () => apiExecutor(api);
  }, [apiExecutor, api]);

  useEffect(() => {
    data && setOptions(dataToOptions(data, keys, splitter));
  }, [data, keys, splitter]);

  useEffect(() => {
    setLoading(true);
    apiFn?.().then((res) => {
      judgeIsSuccess(res) && setOptions(dataToOptions(res.data, keys, splitter));
      setLoading(false);
    });
  }, [apiFn, keys, splitter]);

  return [options, loading, setOptions];
};
