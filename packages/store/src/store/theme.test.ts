import { ThemeStore } from './theme';

describe('ThemeStore', () => {
  test('store', () => {
    const theme = new ThemeStore({ a: 'a', b: 'b', 1: 1, 2: 2 });
    expect(theme.theme).toEqual({ a: 'a', b: 'b', 1: 1, 2: 2 });
    // @ts-ignore
    theme.setTheme({ a: 'a1', 2: 22, c: 'c', 3: 3 });
    expect(theme.theme).toEqual({ a: 'a1', b: 'b', 1: 1, 2: 22, c: 'c', 3: 3 });
  });
});
