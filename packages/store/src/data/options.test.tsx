import { transformOptions } from './options';

describe('transformOptions', () => {
  test('null', () => {
    expect(transformOptions()).toEqual([]);
  });

  test('no keys', () => {
    const options = [{ label: '1', value: '1' }, { label: '2', value: '2' }];
    expect(transformOptions(options)).toEqual(options);
  });

  test('no options', () => {
    const keys = { label: 'label', value: 'value' };
    expect(transformOptions(undefined, keys)).toEqual([]);
  });

  test('keys', () => {
    const options = [{ label1: '1', value1: '1' }, { label1: '2', value1: '2' }];
    const keys = { label: 'label1', value: 'value1' };
    expect(transformOptions(options, keys)).toEqual([
      { label1: '1', value1: '1', label: '1', value: '1' },
      { label1: '2', value1: '2', label: '2', value: '2' },
    ]);
  });
});
