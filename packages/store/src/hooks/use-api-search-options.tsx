import { useField } from '@formily/react';
import { debounce } from 'lodash-es';
import { useState, useRef, SetStateAction, Dispatch, useEffect, useMemo } from 'react';

import { IStoreResponse } from '../store/base';
import { useAPIExecutor } from '../store/config';
import { runStoreAPI } from '../store/utils/api';
import { judgeIsSuccess } from '../tools/api';
import { changeNumInRange } from '../tools/num';
import { IKeys, IOptions, dataToOptions, judgeValueInOptions } from '../tools/options';

import { IOptionsAPI, IOptionsAPIProps } from './use-api-options';
import { useDeepEffect } from './use-deep-effect';
import { useDeepMemo } from './use-deep-memo';

export interface IOptionsAPISearchConfig<T extends string = 'label' | 'value'> {
  request?: IKeys
  keys?: IKeys<T>
  wait?: number
}

export interface IOptionsAPISearchProps<T extends string = 'label' | 'value'> extends IOptionsAPIProps<T> {
  labelAPI?: IOptionsAPI | boolean,
  apiType?: 'search' | 'data'
  searchConfig?: IOptionsAPISearchConfig<T>
}

export const useAPISearchOptions = <T extends string = 'label' | 'value'>(
  input?: string,
  value?: any,
  data?: any,
  api?: IOptionsAPI,
  labelAPI?: IOptionsAPI | boolean,
  searchConfig?: IOptionsAPISearchConfig,
  keys?: IKeys<T>,
  splitter?: string,
): [IOptions<T>, boolean, Dispatch<SetStateAction<IOptions<T>>>] => {
  const [options, setOptions] = useState<IOptions<T>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { dataSource } = useField() as any ?? {};
  const curData = data ?? dataSource;
  const fetchRef = useRef(0);

  const apiExecutor = useAPIExecutor();

  const apiFn = useDeepMemo(() => (!api ? undefined : (value: string) => {
    const getKey = () => searchConfig?.request?.label ?? keys?.label ?? 'name';
    const params = { [getKey()]: value };
    return runStoreAPI(api, apiExecutor, params);
  }), [searchConfig, keys, api, apiExecutor]);

  // eslint-disable-next-line complexity
  const apiFnForValue = useDeepMemo(() => {
    const getKey = () => searchConfig?.request?.value ?? searchConfig?.keys?.value ?? keys?.value ?? 'id';
    if (labelAPI && typeof labelAPI !== 'boolean') {
      return (value: string) => runStoreAPI(labelAPI, apiExecutor, { [getKey()]: value });
    }
    if (labelAPI === true && api) {
      return (value: string) => runStoreAPI(api, apiExecutor, { [getKey()]: value });
    }
    return undefined;
  }, [searchConfig, apiExecutor, keys?.value, api]);

  // 时序、防抖 控制
  const fetcher = useDeepMemo(() => (fn?: (value: any) => undefined | Promise<IStoreResponse>) => {
    if (typeof fn !== 'function') {
      return undefined;
    }
    const loadOptions = (value: string) => {
      fetchRef.current = changeNumInRange(fetchRef.current);
      const fetchId = fetchRef.current;
      setOptions([]);
      setLoading(true);
      fn(value)?.then((res) => {
        if (fetchId === fetchRef.current) {
          setLoading(false);
          const curKeys = (searchConfig?.keys ?? keys) as IKeys<T>;
          judgeIsSuccess(res) && setOptions(dataToOptions(res.data, curKeys, splitter));
        }
      });
    };
    return debounce(loadOptions, searchConfig?.wait ?? 300);
  }, [keys, searchConfig, splitter]);

  const fetchOptions = useMemo(() => fetcher(apiFn), [apiFn, fetcher]);

  const fetchOptionsForValue = useMemo(() => fetcher(apiFnForValue), [apiFnForValue, fetcher]);

  useDeepEffect(() => {
    curData && setOptions(dataToOptions(curData, keys, splitter));
  }, [curData, keys, splitter]);

  useEffect(() => {
    input && fetchOptions?.(input);
  }, [fetchOptions, input]);

  // 当值变化是，反向查找 options,
  useDeepEffect(() => {
    const ifFetch = () => !input && !loading && value && fetchOptionsForValue;
    // const curKeys = (searchConfig?.keys ?? keys) as IKeys<T>;
    // options 格式已处理，不需要再传 keys
    // @ts-ignore
    if (ifFetch() && !judgeValueInOptions(value, options)) {
      fetchOptionsForValue?.(value);
    }
  }, [fetchOptionsForValue, input, keys, loading, options, searchConfig?.keys, value]);

  return [options, loading, setOptions];
};
