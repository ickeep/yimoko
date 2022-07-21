import { ConfigStore } from './config';

describe('ConfigStore', () => {
  test('ConfigStore', () => {
    const config = new ConfigStore({ a: 'a', b: 'b', c: 'c' });

    expect(config.getConfigItem('a')).toBe('a');
    expect(config.getConfig('b')).toEqual({ b: 'b' });
    expect(config.getConfig(['a', 'b'])).toEqual({ a: 'a', b: 'b' });
    // @ts-ignore
    expect(config.getConfig(['a', 'b', 'x'])).toEqual({ a: 'a', b: 'b' });
    expect(config.getConfig()).toEqual({ a: 'a', b: 'b', c: 'c' });

    expect(config.setConfig({ a: 'a1', b: 'b1' })).toEqual({ a: 'a1', b: 'b1', c: 'c' });
  });
});
