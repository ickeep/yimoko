import { Key } from 'react';

import { getAutoArr, JSONParse, JSONStringify, judgeIsEmpty } from './tool';

describe('judgeIsEmpty', () => {
  test('judgeIsEmpty', () => {
    expect(judgeIsEmpty('')).toBe(true);
    expect(judgeIsEmpty(' ')).toBe(false);
    expect(judgeIsEmpty(null)).toBe(true);
    expect(judgeIsEmpty(undefined)).toBe(true);
    expect(judgeIsEmpty(0)).toBe(false);
    expect(judgeIsEmpty(1)).toBe(false);
    expect(judgeIsEmpty(NaN)).toBe(false);
    expect(judgeIsEmpty(false)).toBe(false);
    expect(judgeIsEmpty(true)).toBe(false);
    expect(judgeIsEmpty([])).toBe(true);
    expect(judgeIsEmpty([1])).toBe(false);
    expect(judgeIsEmpty({})).toBe(true);
    expect(judgeIsEmpty({ a: 1 })).toBe(false);
    expect(judgeIsEmpty(BigInt('1'))).toBe(false);
    expect(judgeIsEmpty(() => '')).toBe(false);
  });
});

describe('JSONParse', () => {
  jest.spyOn(console, 'error');

  test('JSONParse', () => {
    expect(JSONParse('{"a":1}')).toEqual({ a: 1 });
    expect(JSONParse('{"a":1}', {})).toEqual({ a: 1 });
    expect(JSONParse('{"a":1}', {}, (key, value) => {
      if (key === 'a') {
        return '1';
      }
      return value;
    })).toEqual({ a: '1' });
  });

  test('JSONParse err', () => {
    expect(JSONParse('{"a":1}1')).toEqual({});
    expect(JSONParse('{"a":1}1', { a: 'a' })).toEqual({ a: 'a' });
  });
});

describe('JSONStringify', () => {
  jest.spyOn(console, 'error');
  test('JSONStringify', () => {
    expect(JSONStringify({ a: 1 })).toEqual('{"a":1}');
  });

  test('JSONStringify err', () => {
    const obj: Record<Key, any> = { key: 'key' };
    obj.o = obj;
    const deviantArr = [null, undefined, true, false, 1, () => '', '', 'str', obj];
    deviantArr.forEach((val: any) => expect(JSONStringify(val)).toEqual(''));
    const df = 'df';
    deviantArr.forEach((val: any) => expect(JSONStringify(val, df)).toEqual(df));
  });
});


describe('getAutoArr', () => {
  test('getAutoArr', () => {
    expect(getAutoArr('')).toEqual([]);
    expect(getAutoArr(null)).toEqual([]);
    expect(getAutoArr(undefined)).toEqual([]);
    expect(getAutoArr(0)).toEqual([0]);
    expect(getAutoArr(1)).toEqual([1]);
    expect(getAutoArr(NaN)).toEqual([NaN]);
    expect(getAutoArr(false)).toEqual([false]);
    expect(getAutoArr(true)).toEqual([true]);
    expect(getAutoArr([])).toEqual([]);
    expect(getAutoArr([1])).toEqual([1]);
    expect(getAutoArr({})).toEqual([]);
    expect(getAutoArr({ a: 1 })).toEqual([{ a: 1 }]);
    expect(getAutoArr(BigInt('1'))).toEqual([BigInt('1')]);
    const fn = () => '';
    expect(getAutoArr(fn)).toEqual([fn]);
  });
});
