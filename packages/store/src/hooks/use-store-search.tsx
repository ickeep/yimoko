import { useForm } from '@formily/react';
import { isEqual } from 'lodash-es';
import { useCallback, useEffect, useRef } from 'react';

import { IStore } from '../store';
import { getValueBySearchParam } from '../store/utils/field';
import { judgeIsEmpty } from '../tools/tool';

export const useStoreSearch = (store: IStore, search: string | Partial<Record<string, string>>) => {
  const form = useForm();
  const isNotFirst = useRef(false);
  const { isRunNow } = store;

  const getIsRun = useCallback((isEmpty: boolean) => {
    const isFirst = !isNotFirst.current;
    isNotFirst.current = true;

    let bool = false;
    if (isEmpty) {
      bool = isFirst && isRunNow;
    } else {
      bool = isRunNow || !isFirst;
    }

    return bool;
  }, [isRunNow]);

  useEffect(() => {
    const { fieldsConfig, isBindSearch, values, defaultValues, setValues, runAPI } = store;
    if (isBindSearch) {
      const newValues: Record<string, any> = {};
      if (typeof search === 'string') {
        const searchParams = new URLSearchParams(search);
        Object.entries(values).forEach(([key, value]) => {
          const strVal = searchParams.get(key);
          if (strVal !== null) {
            const val = getValueBySearchParam(strVal, fieldsConfig[key], defaultValues[key]);
            !isEqual(val, value) && (newValues[key] = val);
          }
        });
      } else {
        Object.entries(search).forEach(([key, value = '']) => {
          const val = getValueBySearchParam(value, fieldsConfig[key], defaultValues[key]);
          !isEqual(val, values[key]) && (newValues[key] = val);
        });
      }
      const isEmpty = judgeIsEmpty(newValues);
      !isEmpty && setValues(newValues);
      // 列表页 search 参数变化，则重新请求数据
      const handleRun = () => {
        if (getIsRun(isEmpty)) {
          if (form) {
            form.submit().then(() => runAPI());
          } else {
            runAPI();
          }
        }
      };
      handleRun();
    }
  }, [form, getIsRun, search, store]);
};
