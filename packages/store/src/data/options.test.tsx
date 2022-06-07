import { arrToOptions } from './options';

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
