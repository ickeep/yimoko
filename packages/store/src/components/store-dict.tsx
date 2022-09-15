import { observer } from '@formily/react';
import { reaction } from '@formily/reactive';
import { useEffect } from 'react';

import { IStore } from '../store';
import { IDictConfigItemBy } from '../store/base';
import { useAPIExecutor } from '../store/config';
import { runStoreAPI } from '../store/utils/api';
import { getFieldIsMultiple, getFieldKeys, getFieldSplitter } from '../store/utils/field';
import { judgeIsSuccess } from '../tools/api';
import { changeNumInRange } from '../tools/num';
import { dataToOptions, DF_KEYS } from '../tools/options';
import { strToArr } from '../tools/str';
import { judgeIsEmpty } from '../tools/tool';

// 使用组件的方式，可以把 observer 的变化范围放到组件的内部，避免 props 的变化对其他组件的影响
export const StoreDict = observer((props: { store: IStore }) => {
  const { store } = props;
  const dfAPIExecutor = useAPIExecutor();
  const { dictConfig, values, apiExecutor = dfAPIExecutor } = store;

  // 初始化字典数据
  useEffect(() => {
    dictConfig?.forEach((conf) => {
      const { field, type } = conf;
      if (type !== 'by') {
        const { data, api } = conf;
        store.setDictByField(field, data);
        if (api) {
          runStoreAPI(api, apiExecutor)?.then?.((res: any) => judgeIsSuccess(res) && store.setDictByField(field, res.data));
        }
      }
    });
  }, [apiExecutor, dictConfig, store]);

  // 联动字典数据
  useEffect(() => {
    const disposerArr: (() => void)[] = [];
    const lastDisposerMap: Record<string, number> = {};
    dictConfig?.forEach((conf) => {
      const { type } = conf;
      if (type === 'by') {
        const { field, getData, api, paramKey = conf.byField, isEmptyGetData = false } = conf;
        const byField = String(conf.byField);
        lastDisposerMap[byField] = 0;

        // eslint-disable-next-line complexity
        const updateDict = (newVal: any) => {
          if (!isEmptyGetData && judgeIsEmpty(newVal)) {
            lastDisposerMap[byField] = changeNumInRange(lastDisposerMap[byField]);
            store.setDictByField(field, []);
            updateValueByDict(conf, [], store);
          } else {
            if (getData) {
              const dictData = getData(newVal);
              store.setDictByField(field, dictData);
              updateValueByDict(conf, dictData, store);
            }
            if (api) {
              lastDisposerMap[byField] = changeNumInRange(lastDisposerMap[byField]);
              const last = lastDisposerMap[byField];
              const params = { [paramKey]: newVal };
              runStoreAPI(api, apiExecutor, params)?.then((res: any) => {
                if (last === lastDisposerMap[byField] && judgeIsSuccess(res)) {
                  store.setDictByField(field, res.data);
                  updateValueByDict(conf, res.data, store);
                }
              });
            }
          }
        };

        const value = values[byField];

        updateDict(value);

        disposerArr.push(reaction(() => values[byField], (newVal) => {
          updateDict(newVal);
        }));
      }
    });

    return () => {
      disposerArr?.forEach(item => item?.());
    };
  }, [apiExecutor, dictConfig, store, values]);

  return null;
});


export const updateValueByDict = (config: IDictConfigItemBy, dict: any, store: IStore) => {
  const { field, isUpdateValue = true } = config;
  if (isUpdateValue) {
    const { values } = store;
    const oldValue = values[field];
    const type = typeof oldValue;
    const isMultiple = getFieldIsMultiple(field, store);
    const splitter = getFieldSplitter(field, store);
    const keys = { ...DF_KEYS, ...getFieldKeys(field, store) };
    const options = dataToOptions(dict, keys, splitter);
    const haveMap: Record<string, boolean> = {};

    options.forEach(item => haveMap[item.value] = true);

    const getOldArr = () => {
      if (Array.isArray(oldValue)) {
        return oldValue;
      }
      return isMultiple && type === 'string' ? strToArr(oldValue, splitter) : [oldValue];
    };

    const oldArr = getOldArr();
    const newArr = oldArr.filter(item => haveMap[item]);

    if (newArr.length !== oldArr.length) {
      const getNewValue = () => {
        if (Array.isArray(oldValue)) {
          return newArr;
        }
        return isMultiple && type === 'string' ? newArr.join(splitter) : newArr[0];
      };

      store.setValuesByField(field, getNewValue());
    }
  }
};
