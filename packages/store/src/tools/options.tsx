// 选项(如下拉选择组件)数据处理
import { omit } from 'lodash-es';
import { Key } from 'react';

import { strToArr } from '../tools/str';

import { judgeIsEmpty } from './tool';

export const DF_KEYS: IKeys = { label: 'label', value: 'value' };

export function arrToOptions<T extends string = 'label' | 'value'>(options: IOptions<T> = [], keys?: IKeys<T>): IOptions<T> {
  if (!keys) {
    return options;
  }
  const optionsKeys: string[] = [];
  const optionsValues: any[] = [];
  Object.entries(keys).forEach(([key, value]) => {
    if (key !== value) {
      optionsKeys.push(key);
      optionsValues.push(value);
    }
  });
  if (judgeIsEmpty(optionsKeys)) {
    return options;
  }

  return options?.map((item) => {
    const newItem: Record<string, string> = omit(item, optionsValues);
    optionsKeys.forEach((key) => {
      const val = item[keys[key]];
      if (val !== undefined || newItem[key] !== undefined) {
        newItem[key] = val;
      }
    });
    return newItem as IOption<T>;
  });
};

export const strToOptions = <T extends string = 'label' | 'value'>(str = '', splitter = ',', keys?: IKeys<T>): IOptions<T> => {
  const optionKeys = Object.keys(keys ?? { label: '', value: '' }) as T[];
  const arr = strToArr(str, splitter);

  return arr.map((item) => {
    const option: Record<string, string> = {};
    optionKeys.forEach((key: any) => option[key] = item);
    return option as IOption<T>;
  });
};

export const objToOptions = <T extends string = 'label' | 'value'>(obj: Record<Key, any> = {}, keys?: IKeys<T>): IOptions<T> => {
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

export type IOptions<T extends Key = 'label' | 'value'> = Array<IOption<T>>;


export type IOption<T extends Key = 'label' | 'value'> = { [key in T]: any } & { [key: string]: any };


export type IKeys<T extends Key = 'label' | 'value'> = { [key in T | string]: string };
