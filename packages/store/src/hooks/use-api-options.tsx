import { useState, useMemo, Dispatch, SetStateAction } from 'react';

import { useAPIExecutor } from '../context/api';
import { runStoreAPI } from '../store/utils/api';
import { IAPIRequestConfig, IHTTPResponse, judgeIsSuccess } from '../tools/api';
import { IKeys, IOptions, dataToOptions } from '../tools/options';

import { useDeepEffect } from './use-deep-effect';

export interface IOptionsAPIProps<T extends string = 'label' | 'value'> {
  splitter?: string
  keys?: IKeys<T>
  options?: IOptions<T>
  api?: IOptionsAPI
  valueType?: 'none' | 'string' | 'array'
}

export const defaultOutOptionsKeys = { title: 'title', desc: 'desc', img: 'img', url: 'url', click: 'click', routeType: 'routeType' };

export type IOptionsOutAPIProps<T extends string = keyof typeof defaultOutOptionsKeys> = Omit<IOptionsAPIProps<T>, 'valueType'>;

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
    apiFn && setLoading(true);
    apiFn?.()?.then((res) => {
      judgeIsSuccess(res) && setOptions(dataToOptions(res.data, keys, splitter));
      setLoading(false);
    });
  }, [apiFn, keys, splitter]);

  return [options, loading, setOptions];
};
