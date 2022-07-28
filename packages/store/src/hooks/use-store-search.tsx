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
      const searchParams = new URLSearchParams(search);
      Object.entries(values).forEach(([key, value]) => {
        const strVal = searchParams.get(key);
        if (strVal !== null) {
          const val = getValueBySearchParam(strVal, fieldsConfig[key], defaultValues[key]);
          !isEqual(val, value) && (newValues[key] = val);
        }
      });
      const isEmpaty = judgeIsEmpty(newValues);
      !isEmpaty && setValues(newValues);
      // 列表页 search 参数变化，则重新请求数据
      const heandleRun = () => {
        if (store instanceof ListStore && getIsRun(isEmpaty)) {
          if (form) {
            form.submit().then(() => runAPI());
          } else {
            runAPI();
          }
        }
      };
      heandleRun();
    }
  }, [form, getIsRun, search, store]);
};
