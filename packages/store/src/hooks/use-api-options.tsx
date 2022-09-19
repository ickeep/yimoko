import { useField } from '@formily/react';
import { useState, Dispatch, SetStateAction } from 'react';

import { useAPIExecutor } from '../store/config';

import { runStoreAPI } from '../store/utils/api';
import { IAPIRequestConfig, IHTTPResponse, judgeIsSuccess } from '../tools/api';
import { IKeys, IOptions, dataToOptions } from '../tools/options';

import { useDeepEffect } from './use-deep-effect';
import { useDeepMemo } from './use-deep-memo';

export interface IOptionsAPIProps<T extends string = 'label' | 'value'> {
  splitter?: string
  keys?: IKeys<T>
  options?: IOptions<T>
  api?: IOptionsAPI
  valueType?: 'none' | 'string' | 'array'
}

export const defaultOutOptionsKeys = { title: 'title', desc: 'desc', img: 'img', icon: 'icon', url: 'url', click: 'click', routeType: 'routeType' };

export type IOptionsOutAPIProps<T extends string = keyof typeof defaultOutOptionsKeys> = Omit<IOptionsAPIProps<T>, 'valueType'>;

export type IOptionsAPI = IAPIRequestConfig | ((config?: IAPIRequestConfig) => Promise<IHTTPResponse>);

export const useAPIOptions = <T extends string = 'label' | 'value'>(
  data?: any, api?: IOptionsAPI, keys?: IKeys<T>, splitter?: string,
): [IOptions<T>, boolean, Dispatch<SetStateAction<IOptions<T>>>] => {
  const [options, setOptions] = useState<IOptions<T>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { dataSource } = useField() as any ?? {};
  const curData = data ?? dataSource;

  const apiExecutor = useAPIExecutor();
  const apiFn = useDeepMemo(() => (!api ? undefined : () => runStoreAPI(api, apiExecutor)), [apiExecutor, api]);

  useDeepEffect(() => {
    curData && setOptions(dataToOptions(curData, keys, splitter));
  }, [curData, keys, splitter]);

  useDeepEffect(() => {
    apiFn && setLoading(true);
    apiFn?.()?.then((res: any) => {
      judgeIsSuccess(res) && setOptions(dataToOptions(res.data, keys, splitter));
      setLoading(false);
    });
  }, [apiFn, keys, splitter]);

  return [options, loading, setOptions];
};
