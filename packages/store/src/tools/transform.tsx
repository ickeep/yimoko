// 根据规则 转换数据
import { cloneDeep, get, omit, pick, set } from 'lodash-es';
import { Key } from 'react';

import { IKeys } from './options';
import { judgeIsEmpty } from './tool';

type ITransformType =
  { type: 'swap' | 'arrItemSwap', keys: IKeys<string> } |
  { type: 'omit' | 'pick' | 'arrItemOmit' | 'arrItemPick', keys: string | string[] } |
  { type: 'filter' | 'arrItemFilter', predicate?: (v: any, i: number, arr: any[]) => boolean, equalKeys?: Record<Key, any> };

export type ITransformRule = ITransformType & { valueKey?: string | string[] };

export const transformData = (values: any, rules: ITransformRule | ITransformRule[] = []) => {
  if (judgeIsEmpty(rules) || judgeIsEmpty(values)) {
    return values;
  }
  let newValues = cloneDeep(values);
  const ruleList = Array.isArray(rules) ? rules : [rules];
  ruleList.forEach((rule) => {
    const { valueKey, ...args } = rule;
    const toValue = valueKey ? get(newValues, valueKey) : newValues;
    const newValue = heddleTransform(toValue, args);
    if (valueKey) {
      set(newValues, valueKey, newValue);
    } else {
      newValues = newValue;
    }
  });
  return newValues;
};

export const heddleTransform = (values: any, rule: ITransformType) => {
  if (judgeIsEmpty(values)) {
    return values;
  }
  const fnMap: Record<ITransformType['type'], (rule: any) => any> = {
    swap: rule => swap(values, rule.keys),
    omit: rule => omit(values, rule.keys),
    pick: rule => pick(values, rule.keys),

    filter: rule => filter(values, rule.predicate, rule.equalKeys),
    arrItemSwap: rule => values?.map?.((v: any) => swap(v, rule.keys)) ?? values,
    arrItemOmit: rule => values?.map?.((v: any) => omit(v, rule.keys)) ?? values,
    arrItemPick: rule => values?.map?.((v: any) => pick(v, rule.keys)) ?? values,
    arrItemFilter: rule => values?.map?.((v: any) => filter(v, rule.predicate, rule.equalKeys)) ?? values,
  };

  return fnMap[rule.type]?.(rule) ?? values;
};

const filter = (value: any, predicate?: (v: any, i: number, arr: any[]) => boolean, equalKeys?: Record<Key, any>) => {
  if (!Array.isArray(value)) {
    return value;
  }
  let newValue = value;
  if (predicate) {
    newValue = value.filter(predicate);
  }
  if (equalKeys) {
    newValue = value.filter((v: any) => Object.entries(equalKeys).every(([key, value]) => get(v, key) === value));
  }
  return newValue;
};

const swap = (values: any, keys: IKeys<string>) => {
  Object.entries(keys).forEach(([oldKey, newKey]) => {
    const temp = get(values, oldKey);
    set(values, oldKey, get(values, newKey));
    set(values, newKey, temp);
  });
  return values;
};
