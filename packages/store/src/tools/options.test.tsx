import { arrToOptions, strToOptions, objToOptions, dataToOptions, judgeValueInOptions } from './options';

describe('arrToOptions', () => {
  test('null', () => {
    expect(arrToOptions()).toEqual([]);
  });

  test('no keys', () => {
    const options = [{ label: '1', value: '1' }, { label: '2', value: '2' }];
    expect(arrToOptions(options)).toEqual(options);
  });

  test('no options', () => {
    const keys = { label: 'label', value: 'value' };
    expect(arrToOptions(undefined, keys)).toEqual([]);
  });

  test('keys', () => {
    const options = [{ label1: '1', value1: '1', x: 'x1' }, { label1: '2', value1: '2', x: 'x2' }];
    const keys = { label: 'label1', value: 'value1' };
    expect(arrToOptions(options, keys)).toEqual([
      { label: '1', value: '1', x: 'x1' },
      { label: '2', value: '2', x: 'x2' },
    ]);
  });
});

describe('strToOptions', () => {
  test('null', () => {
    expect(strToOptions()).toEqual([]);
  });

  test('no keys', () => {
    expect(strToOptions('1,2')).toEqual([{ label: '1', value: '1' }, { label: '2', value: '2' }]);
  });

  test('no options', () => {
    const keys = { label: 'label', value: 'value' };
    expect(strToOptions(undefined, ',', keys)).toEqual([]);
  });

  test('keys', () => {
    const keys = { label: 'label1', value: 'value1' };
    expect(strToOptions('1.2', '.', keys)).toEqual([
      { label: '1', value: '1' },
      { label: '2', value: '2' },
    ]);
  });
});

describe('objToOptions', () => {
  test('null', () => {
    expect(objToOptions()).toEqual([]);
  });
  test('no keys', () => {
    expect(objToOptions({ 1: '1', 2: null })).toEqual([{ label: '1', value: '1' }, { label: '2', value: '2' }]);
  });
  test('no options', () => {
    const keys = { label: 'label', value: 'value' };
    expect(objToOptions(undefined, keys)).toEqual([]);
  });

  test('keys', () => {
    const keys = { label: 'label1' };
    expect(objToOptions({ 1: { label1: '1' }, 2: { label1: '2' } }, keys)).toEqual([
      { label: '1', value: '1' },
      { label: '2', value: '2' },
    ]);
  });

  test('keys value', () => {
    const keys = { label: 'label1', value: 'value1' };
    expect(objToOptions({ 1: { label1: '1', value1: 'v1' }, 2: { label1: '2', value1: 'v2' } }, keys)).toEqual([
      { label: '1', value: 'v1' },
      { label: '2', value: 'v2' },
    ]);
  });
});

describe('dataToOptions', () => {
  const keys = { label: 'label1', value: 'value1' };
  const data = [{ label: '1', value: '1' }, { label: '2', value: '2' }];

  test('odd', () => {
    expect(dataToOptions()).toEqual([]);
    expect(dataToOptions(true)).toEqual([]);
    expect(dataToOptions(false)).toEqual([]);
    expect(dataToOptions({})).toEqual([]);
    expect(dataToOptions(null)).toEqual([]);
    expect(dataToOptions(undefined)).toEqual([]);
    expect(dataToOptions(() => '')).toEqual([]);
  });

  test('arr', () => {
    expect(dataToOptions([{ label1: '1', value1: '1' }, { label1: '2', value1: '2' }], keys)).toEqual(data);
  });

  test('str', () => {
    expect(dataToOptions('1,2', keys)).toEqual(data);
    expect(dataToOptions('1|2', keys, '|')).toEqual(data);
  });

  test('obj', () => {
    expect(dataToOptions({ 1: '1', 2: '2' })).toEqual(data);
    expect(dataToOptions({ 1: { label1: '1', value1: '1' }, 2: { label1: '2', value1: '2' } }, keys)).toEqual(data);
  });
});

describe('judgeValueInOptions', () => {
  test('', () => {
    expect(judgeValueInOptions(1, [{ label: '1', value: '1' }, { label: '2', value: '2' }])).toBeFalsy();
    expect(judgeValueInOptions('1', [{ label: '1', value: '1' }, { label: '2', value: '2' }])).toBeTruthy();
    expect(judgeValueInOptions('1', [])).toBeFalsy();
  });
});
