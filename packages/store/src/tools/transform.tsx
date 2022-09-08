// 根据规则 转换数据
import { cloneDeep, get, omit, pick, set } from 'lodash-es';

import { IKeys } from './options';
import { judgeIsEmpty } from './tool';

type ITransformType =
  { type: 'swapKeys', keys: IKeys<string> } |
  { type: 'omit', keys: string | string[] } |
  { type: 'pick', keys: string | string[] } |
  { type: 'filter', predicate?: (v: any, i: number, arr: any[]) => boolean, equalKeys?: Record<string, any> };

export type ITransformRule = ITransformType & { valueKey?: string | string[] };

export const transformData = (values: any, rules: ITransformRule | ITransformRule[] = []) => {
  if (judgeIsEmpty(rules)) {
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
    swapKeys: rule => swapKeys(values, rule.keys),
    omit: rule => omit(values, rule.keys),
    pick: rule => pick(values, rule.keys),
    filter: rule => filter(values, rule.predicate, rule.equalKeys),
  };

  return fnMap[rule.type]?.(rule) ?? values;
};

const filter = (value: any, predicate?: (v: any, i: number, arr: any[]) => boolean, equalKeys?: Record<string, any>) => {
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

const swapKeys = (values: any, keys: IKeys<string>) => {
  Object.entries(keys).forEach(([oldKey, newKey]) => {
    const temp = get(values, oldKey);
    set(values, oldKey, get(values, newKey));
    set(values, newKey, temp);
  });
  return values;
};
