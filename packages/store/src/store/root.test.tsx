import { RootStore } from './root';

describe('RootStore', () => {
  test('df', () => {
    const root = new RootStore();
    expect(root.user).toEqual({});
    expect(root.menus).toBeUndefined();
    expect(root.data).toEqual({});
  });

  test('store', () => {
    const root = new RootStore();
    root.init({ user: { id: 1 }, menus: [], data: { a: 'a' } });
    expect(root.user).toEqual({ id: 1 });
    expect(root.menus).toEqual([]);
    expect(root.data).toEqual({ a: 'a' });

    root.setUser({ id: 2 });
    expect(root.user).toEqual({ id: 2 });

    root.setMenus([{ id: 1 }]);
    expect(root.menus).toEqual([{ id: 1 }]);

    root.setData({ b: 'b' });
    expect(root.data).toEqual({ b: 'b' });

    root.setDataItem('c', 'c');
    expect(root.data).toEqual({ b: 'b', c: 'c' });

    expect(root.getDataItem('c')).toEqual('c');
    expect(root.getDataItem('a')).toBeUndefined();
  });
});
