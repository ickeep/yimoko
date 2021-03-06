import { useForm } from '@formily/react';
import { isEqual } from 'lodash-es';
import { useCallback, useEffect, useRef } from 'react';

import { IStore } from '../store';
import { ListStore } from '../store/list';
import { getValueBySearchParam } from '../store/utils/field';
import { judgeIsEmpty } from '../tools/tool';

export const useStoreSearch = (store: IStore, search: string) => {
  const form = useForm();
  const isNotFirst = useRef(false);
  const { isRunNow } = store;

  const getIsRun = useCallback(() => {
    const bool = store instanceof ListStore && (isRunNow || isNotFirst.current);
    isNotFirst.current = true;
    return bool;
  }, [isRunNow, store]);

  useEffect(() => {
    const { fieldsConfig, isBindSearch, values, defaultValues, setValues, runAPI } = store;

    if (isBindSearch) {
      const newValues: Record<string, any> = {};
      const searchParams = new URLSearchParams(search);
      Object.entries(values).forEach(([key, value]) => {
        if (searchParams.has(key)) {
          const val = getValueBySearchParam(searchParams.get(key) ?? '', fieldsConfig[key], defaultValues[key]);
          !isEqual(val, value) && (newValues[key] = val);
        }
      });
      if (!judgeIsEmpty(newValues)) {
        setValues(newValues);
        getIsRun() && form.submit().then(() => runAPI());
      }
    }
  }, [form, getIsRun, search, store]);
};
