import { debounce } from 'lodash-es';
import { useState, useRef, SetStateAction, Dispatch, useEffect, useMemo } from 'react';

import { useAPIExecutor } from '../context/api';
import { IHTTPResponse, judgeIsSuccess } from '../data/api';
import { IKeys, IOptions, dataToOptions, judgeValueInOptions } from '../data/options';
import { changeNumInRange } from '../tools/num';

import { IOptionsAPI } from './use-api-options';
import { useDeepEffect } from './use-deep-effect';
import { useDeepMemo } from './use-deep-memo';

export interface IOptionsAPISearchConfig<T extends string = 'label' | 'value'> {
  request?: IKeys
  keys?: IKeys<T>
  wait?: number
}

export const useAPISearchOptions = <T extends string = 'label' | 'value'>(

  input?: string, value?: any, data?: any, api?: IOptionsAPI, labelAPI?: IOptionsAPI | boolean,
  searchConfig?: IOptionsAPISearchConfig, keys?: IKeys<T>, splitter?: string,

): [IOptions<T>, boolean, Dispatch<SetStateAction<IOptions<T>>>] => {
  const [options, setOptions] = useState<IOptions<T>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchRef = useRef(0);

  const apiExecutor = useAPIExecutor();

  const apiFn = useDeepMemo(() => (!api ? undefined : (values: string) => {
    const getKey = () => searchConfig?.request?.label ?? keys?.label ?? 'name';
    const params = { [getKey()]: values };
    if (typeof api === 'function') {
      return api(params);
    }
    return apiExecutor({ ...api, params, data: params });
  }), [searchConfig, keys, api, apiExecutor]);

  const apiFnForValue = useDeepMemo(() => (!labelAPI ? undefined : (values: string) => {
    const getKey = () => searchConfig?.request?.value ?? searchConfig?.keys?.value ?? keys?.value ?? 'id';
    const params = { [getKey()]: values };

    if (labelAPI === true) {
      if (typeof api === 'function') {
        return api(params);
      }
      return apiExecutor({ ...api, params, data: params });
    }

    if (typeof labelAPI === 'function') {
      return labelAPI(params);
    }

    return apiExecutor({ ...labelAPI, params, data: params });
  }), [searchConfig, apiExecutor, keys?.value, api]);

  // ??????????????? ??????
  const fetcher = useDeepMemo(() => (fn?: (value: any) => Promise<IHTTPResponse>) => {
    if (typeof fn !== 'function') {
      return undefined;
    }
    const loadOptions = (values: string) => {
      fetchRef.current = changeNumInRange(fetchRef.current);
      const fetchId = fetchRef.current;
      setOptions([]);
      setLoading(true);
      fn(values).then((res) => {
        if (fetchId === fetchRef.current) {
          setLoading(false);
          judgeIsSuccess(res) && setOptions(dataToOptions(res.data, searchConfig?.keys ?? keys, splitter));
        }
      });
    };
    return debounce(loadOptions, searchConfig?.wait ?? 300);
  }, [keys, searchConfig, splitter]);


  const fetchOptions = useMemo(() => fetcher(apiFn), [apiFn, fetcher]);

  const fetchOptionsForValue = useMemo(() => fetcher(apiFnForValue), [apiFnForValue, fetcher]);

  useDeepEffect(() => {
    data && setOptions(dataToOptions(data, keys, splitter));
  }, [data, keys, splitter]);

  useEffect(() => {
    input && fetchOptions?.(input);
  }, [fetchOptions, input]);

  // ?????????????????????????????? options,
  useDeepEffect(() => {
    const ifFetch = () => !input && !loading && value && fetchOptionsForValue;

    if (ifFetch() && !judgeValueInOptions(value, options, searchConfig?.keys ?? keys)) {
      fetchOptionsForValue?.(value);
    }
  }, [fetchOptionsForValue, input, keys, loading, options, searchConfig?.keys, value]);

  return [options, loading, setOptions];
};
