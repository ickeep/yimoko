import { useState, useMemo, Dispatch, SetStateAction } from 'react';

import { useAPIExecutor } from '../context/api';
import { IAPIRequestConfig, IHTTPResponse, judgeIsSuccess } from '../data/api';
import { IKeys, IOptions, dataToOptions } from '../data/options';
import { runStoreAPI } from '../store/utils/api';

import { useDeepEffect } from './use-deep-effect';

export type IOptionsAPI = IAPIRequestConfig | ((config?: IAPIRequestConfig) => Promise<IHTTPResponse>);

export const useAPIOptions = <T extends string = 'label' | 'value'>(
  data?: any, api?: IOptionsAPI, keys?: IKeys<T>, splitter?: string,
): [IOptions<T>, boolean, Dispatch<SetStateAction<IOptions<T>>>] => {
  const [options, setOptions] = useState<IOptions<T>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const apiExecutor = useAPIExecutor();

  const apiFn = useMemo(() => (!api ? undefined : () => runStoreAPI(api, apiExecutor)), [apiExecutor, api]);

  useDeepEffect(() => {
    data && setOptions(dataToOptions(data, keys, splitter));
  }, [data, keys, splitter]);

  useDeepEffect(() => {
    setLoading(true);
    apiFn?.().then((res) => {
      judgeIsSuccess(res) && setOptions(dataToOptions(res.data, keys, splitter));
      setLoading(false);
    });
  }, [apiFn, keys, splitter]);

  return [options, loading, setOptions];
};
