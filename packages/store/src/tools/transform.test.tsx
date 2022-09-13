import { transformData } from './transform';

describe('transformData', () => {
  test('swap', () => {
    expect(transformData({ a: 1, b: 2 }, { type: 'swap', keys: { a: 'c', b: 'd' } })).toEqual({ c: 1, d: 2 });
    expect(transformData({ a: 1, b: 2 }, { type: 'swap', keys: { a: 'b' } })).toEqual({ a: 2, b: 1 });
  });

  test('omit', () => {
    expect(transformData({ a: 1, b: 2 }, { type: 'omit', keys: 'a' })).toEqual({ b: 2 });
    expect(transformData({ a: 1, b: 2 }, { type: 'omit', keys: ['a'] })).toEqual({ b: 2 });
    expect(transformData({ a: 1, b: 2 }, { type: 'omit', keys: ['a', 'b'] })).toEqual({});
  });

  test('pick', () => {
    expect(transformData({ a: 1, b: 2 }, { type: 'pick', keys: 'a' })).toEqual({ a: 1 });
    expect(transformData({ a: 1, b: 2 }, { type: 'pick', keys: ['a'] })).toEqual({ a: 1 });
    expect(transformData({ a: 1, b: 2 }, { type: 'pick', keys: ['a', 'b'] })).toEqual({ a: 1, b: 2 });
  });

  test('filter', () => {
    expect(transformData({ a: 'a' }, { type: 'filter', predicate: (v: number) => v > 1 })).toEqual({ a: 'a' });
    expect(transformData([1, 2, 3], { type: 'filter', predicate: (v: number) => v > 1 })).toEqual([2, 3]);
    expect(transformData([{ a: 1 }, { a: 2 }, { a: 3 }], { type: 'filter', equalKeys: { a: 1 } })).toEqual([{ a: 1 }]);
  });

  test('arrItemSwap', () => {
    expect(transformData({ a: 1 }, { type: 'arrItemSwap', keys: { a: 'b' } })).toEqual({ a: 1 });
    expect(transformData(
      [
        { a: '0-a', b: '0-b' },
        { a: '1-a', b: '1-b' }],
      { type: 'arrItemSwap', keys: { a: 'b' } },
    )).toEqual([
      { a: '0-b', b: '0-a' },
      { a: '1-b', b: '1-a' },
    ]);
  });

  test('arrItemOmit', () => {
    expect(transformData({ a: 1 }, { type: 'arrItemOmit', keys: 'a' })).toEqual({ a: 1 });
    expect(transformData(
      [
        { a: '0-a', b: '0-b' },
        { a: '1-a', b: '1-b' }],
      { type: 'arrItemOmit', keys: 'a' },
    )).toEqual([
      { b: '0-b' },
      { b: '1-b' },
    ]);
  });

  test('arrItemPick', () => {
    expect(transformData({ a: 1 }, { type: 'arrItemPick', keys: 'a' })).toEqual({ a: 1 });
    expect(transformData(
      [
        { a: '0-a', b: '0-b' },
        { a: '1-a', b: '1-b' }],
      { type: 'arrItemPick', keys: 'a' },
    )).toEqual([
      { a: '0-a' },
      { a: '1-a' },
    ]);
  });

  test('arrItemFilter', () => {
    expect(transformData({ a: 1 }, { type: 'arrItemFilter', equalKeys: { a: '1-a' } })).toEqual({ a: 1 });

    expect(transformData(
      [[
        { a: '0-a', b: '0-b' },
        { a: '1-a', b: '1-b' },
      ]],
      { type: 'arrItemFilter', equalKeys: { a: '1-a' } },
    )).toEqual([[
      { a: '1-a', b: '1-b' },
    ]]);
  });

  test('valuesKey', () => {
    expect(transformData(
      { val: { a: '0-a', b: '0-b' } },
      { valueKey: 'val', type: 'swap', keys: { a: 'b' } },
    )).toEqual({ val: { a: '0-b', b: '0-a' } });
  });

  test('empty', () => {
    expect(transformData({}, { type: 'swap', keys: { a: 'b' } })).toEqual({});
    expect(transformData({})).toEqual({});
    expect(transformData({ val: {} }, { valueKey: 'val', type: 'swap', keys: { a: 'b' } })).toEqual({ val: {} });
  });

  test('multi', () => {
    expect(transformData(
      { a: 1, b: 2 },
      [{ type: 'swap', keys: { a: 'c', b: 'd' } }, { type: 'omit', keys: 'c' }],
    )).toEqual({ d: 2 });
  });

  test('not fn', () => {
    // @ts-ignore
    expect(transformData({ a: 1, b: 2 }, { type: 'xxxx', keys: { a: 'c', b: 'd' } })).toEqual({ a: 1, b: 2 });
  });
});
