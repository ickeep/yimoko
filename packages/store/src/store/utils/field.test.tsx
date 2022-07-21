import { DF_KEYS } from '../../tools/options';
import { BaseStore } from '../base';

import { getSearchParamByValue, getValueBySearchParam, getFieldSplitter, getFieldType, getFieldIsMultiple, getFieldKeys } from './field';

describe('field', () => {
  test('getSearchParamByValue', () => {
    expect(getSearchParamByValue(undefined)).toBe('');
    expect(getSearchParamByValue(null)).toBe('');
    expect(getSearchParamByValue('')).toBe('');
    expect(getSearchParamByValue('123')).toBe('123');
    expect(getSearchParamByValue(123)).toBe('123');
    expect(getSearchParamByValue(true)).toBe('true');
    expect(getSearchParamByValue(false)).toBe('false');
    expect(getSearchParamByValue({})).toBe('{}');
    expect(getSearchParamByValue([])).toBe('[]');
    expect(getSearchParamByValue({ a: 1, b: 2 })).toBe('{"a":1,"b":2}');
  });

  test('getValueBySearchParam', () => {
    expect(getValueBySearchParam('')).toBe('');
    expect(getValueBySearchParam('123')).toBe('123');
    expect(getValueBySearchParam('123', { type: 'number' })).toBe(123);
    expect(getValueBySearchParam('true', { type: 'boolean' })).toBe(true);
    expect(getValueBySearchParam('false', { type: 'boolean' })).toBe(false);
    expect(getValueBySearchParam('{}', { type: 'object' })).toEqual({});
    expect(getValueBySearchParam('[]', { type: 'array' })).toEqual([]);
    expect(getValueBySearchParam('[]', { type: 'void' })).toBeUndefined();
    expect(getValueBySearchParam('{"a":1,"b":2}', { type: 'object' })).toEqual({ a: 1, b: 2 });
    expect(getValueBySearchParam('{"a":1,"b":2}', { type: 'array' })).toEqual([]);
    expect(getValueBySearchParam('{"a":1,"b":2}', { type: 'number' })).toBeNaN();
    expect(getValueBySearchParam('{"a":1,"b":2}', { type: 'boolean' })).toBe(false);
    expect(getValueBySearchParam('{"a":1,"b":2}', { type: 'string' })).toBe('{"a":1,"b":2}');

    expect(getValueBySearchParam('123', {}, 1)).toBe(123);
    expect(getValueBySearchParam('123', {}, '1')).toBe('123');
    expect(getValueBySearchParam('true', {}, true)).toBe(true);
    expect(getValueBySearchParam('false', {}, true)).toBe(false);
    expect(getValueBySearchParam('{}', {}, {})).toEqual({});
    expect(getValueBySearchParam('[]', {}, [])).toEqual([]);

    expect(getValueBySearchParam('1234567890123456789012345678901234567890', {}, BigInt('123')))
      .toBe(BigInt('1234567890123456789012345678901234567890'));
  });

  test('getFieldSplitter', () => {
    const store = new BaseStore({
      defaultValues: {},
      api: {},
      fieldsConfig: {
        a: {},
        b: { 'x-component-props': {} },
        c: { 'x-component-props': { splitter: ',' } },
        d: { 'x-component-props': { splitter: '.' } },
        e: { 'x-component-props': { splitter: '|' } },
      },
    });
    expect(getFieldSplitter('a', store)).toBe(',');
    expect(getFieldSplitter('b', store)).toBe(',');
    expect(getFieldSplitter('c', store)).toBe(',');
    expect(getFieldSplitter('d', store)).toBe('.');
    expect(getFieldSplitter('e', store)).toBe('|');
  });

  test('getFieldType', () => {
    const store = new BaseStore({
      defaultValues: { d: '123', e: true, f: false, g: {}, h: [], i: BigInt('123'), j: Symbol('123'), k: () => '' },
      api: {},
      fieldsConfig: { b: {}, c: { type: 'number' } },
    });
    expect(getFieldType('a', store)).toBeUndefined();
    expect(getFieldType('b', store)).toBeUndefined();
    expect(getFieldType('c', store)).toBe('number');
    expect(getFieldType('d', store)).toBe('string');
    expect(getFieldType('e', store)).toBe('boolean');
    expect(getFieldType('f', store)).toBe('boolean');
    expect(getFieldType('g', store)).toBe('object');
    expect(getFieldType('h', store)).toBe('array');
    expect(getFieldType('i', store)).toBe('bigint');
    expect(getFieldType('j', store)).toBe('symbol');
    expect(getFieldType('k', store)).toBe('function');
  });

  test('getFieldIsMultiple', () => {
    const store = new BaseStore({
      defaultValues: {},
      api: {},
      fieldsConfig: {
        a: {},
        b: { 'x-component-props': {} },
        c: { 'x-component-props': { mode: '' } },
        d: { 'x-component-props': { mode: 'multiple' } },
        e: { 'x-component-props': { mode: 'tags' } },
      },
    });
    expect(getFieldIsMultiple('a', store)).toBeFalsy();
    expect(getFieldIsMultiple('b', store)).toBeFalsy();
    expect(getFieldIsMultiple('c', store)).toBeFalsy();
    expect(getFieldIsMultiple('d', store)).toBeTruthy();
    expect(getFieldIsMultiple('e', store)).toBeTruthy();
  });

  test('getFieldKeys', () => {
    const store = new BaseStore({
      defaultValues: {},
      api: {},
      fieldsConfig: {
        a: {},
        b: { 'x-component-props': {} },
        c: { 'x-component-props': { keys: {} } },
        d: { 'x-component-props': { keys: { value: 'id' } } },
        e: { 'x-component-props': { keys: { label: 'name' } } },
        f: { 'x-component-props': { keys: { value: 'id', label: 'name' } } },
      },
    });
    expect(getFieldKeys('a', store)).toEqual(DF_KEYS);
    expect(getFieldKeys('b', store)).toEqual(DF_KEYS);
    expect(getFieldKeys('c', store)).toEqual(DF_KEYS);
    expect(getFieldKeys('d', store)).toEqual({ ...DF_KEYS, value: 'id' });
    expect(getFieldKeys('e', store)).toEqual({ ...DF_KEYS, label: 'name' });
    expect(getFieldKeys('f', store)).toEqual({ ...DF_KEYS, value: 'id', label: 'name' });
  });
});
