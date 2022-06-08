// 选项(如下拉选择组件)数据处理
import { omit } from 'lodash-es';

import { strToArr } from '../tools/str';

export type IOptions<T extends string = 'label' | 'value'> = Record<T | string, any>[];

export type IKeys<T extends string = 'label' | 'value'> = Record<T | string, string>;

export const DF_KEYS: IKeys = { label: 'label', value: 'value' };

export const arrToOptions = <T extends string = 'label' | 'value'>(options?: IOptions<T>, keys?: IKeys<T>) => {
  if (!keys) {
    return options ?? [];
  }
  const optionsKeys = Object.keys(keys) as T[];
  const optionsValues = Object.values(keys);
  return options?.map((item) => {
    const newItem: Record<string, string> = omit(item, optionsValues);
    optionsKeys.forEach(key => newItem[key] = item[keys[key]]);
    return newItem;
  }) ?? [];
};

export const strToOptions = <T extends string = 'label' | 'value'>(str: string, splitter = ',', keys?: IKeys<T>): IOptions<T> => {
  const optionKeys = Object.keys(keys ?? { label: '', value: '' }) as T[];
  const arr = strToArr(str, splitter);

  return arr.map((item) => {
    const option: Record<string, string> = {};
    optionKeys.forEach(key => option[key] = item);
    return option;
  });
};

export const objToOptions = <T extends string = 'label' | 'value'>(obj: Record<string, any>, keys?: IKeys<T>): IOptions<T> => {
  const options = Object.entries(obj).map(([key, value]) => {
    if (value && typeof value === 'object') {
      return { value: key, ...value };
    }
    return { value: key, label: value?.toString?.() ?? '' };
  });
  return arrToOptions(options, keys);
};

export const dataToOptions = <T extends string = 'label' | 'value'>(data: any, keys?: IKeys<T>, splitter = ','): IOptions<T> => {
  if (Array.isArray(data)) {
    return arrToOptions(data, keys);
  }

  if (typeof data === 'string') {
    return strToOptions(data, splitter, keys);
  }

  if (typeof data === 'object') {
    return objToOptions(data, keys);
  }
  return [];
};

export const judgeValueInOptions = (value: any, options: IOptions<'value'>, keys?: IKeys<'value'>) => {
  const key = keys?.value ?? 'value';
  return options?.some(item => item[key] === value);
};


// 获取选项数据里的有效值，常用于数据联动，如 省 改变，则 市 的数据应该发生变化
export const getValidValueForOptions = (oldValue: any, options: IOptions<'value'>, keys?: IKeys<'value'>, splitter = ',') => {
  if (typeof oldValue === 'string') {
    return (
      strToArr(oldValue, splitter)
        .filter(item => judgeValueInOptions(item, options, keys))
        .join(splitter)
    );
  }

  if (Array.isArray(oldValue)) {
    return oldValue.filter(item => judgeValueInOptions(item, options, keys));
  }

  return judgeValueInOptions(oldValue, options, keys) ? oldValue : '';
};
