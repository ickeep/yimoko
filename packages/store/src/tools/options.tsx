// 选项(如下拉选择组件)数据处理
import { omit } from 'lodash-es';

import { strToArr } from '../tools/str';

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

export const strToOptions = <T extends string = 'label' | 'value'>(str = '', splitter = ',', keys?: IKeys<T>): IOptions<T> => {
  const optionKeys = Object.keys(keys ?? { label: '', value: '' }) as T[];
  const arr = strToArr(str, splitter);

  return arr.map((item) => {
    const option: Record<string, string> = {};
    optionKeys.forEach(key => option[key] = item);
    return option;
  });
};

export const objToOptions = <T extends string = 'label' | 'value'>(obj: Record<string, any> = {}, keys?: IKeys<T>): IOptions<T> => {
  const options = !obj ? [] : Object.entries(obj).map(([key, value]) => {
    if (value && typeof value === 'object') {
      return { value: key, ...value };
    }
    return { value: key, label: value?.toString?.() ?? key };
  });
  return arrToOptions(options, keys);
};

export const dataToOptions = <T extends string = 'label' | 'value'>(data?: any, keys?: IKeys<T>, splitter = ','): IOptions<T> => {
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

export type IOptions<T extends string = 'label' | 'value'> = Record<T | string, any>[];

export type IKeys<T extends string = 'label' | 'value'> = Record<T | string, string>;