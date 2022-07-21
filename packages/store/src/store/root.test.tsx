import { observer } from '@formily/react';
import '@testing-library/jest-dom';

import { act, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { RootStore, RootProvider, RootConsumer, useUesr, useRoot, useMenus, useData } from './root';

const NameConsumer = observer(() => {
  const { name } = useUesr();
  return <div>{name ?? 'unknown'}</div>;
});

const DataConsumer = observer(({ name }: { name?: string }) => {
  const val = useData(name);
  return <div>{val}</div>;
});

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

  test('RootContext', () => {
    render(<NameConsumer />);
    expect(screen.getByText('unknown')).toBeInTheDocument();
  });

  test('RootProvider', () => {
    const root = new RootStore();
    render(<RootProvider value={root}><NameConsumer /></RootProvider>);
    expect(screen.getByText('unknown')).toBeInTheDocument();
    act(() => {
      root.setUser({ name: 'test' });
    });
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('RootConsumer', () => {
    const root = new RootStore<any, any>({ user: { name: 'test' } });
    render(<RootProvider value={root}>
      <RootConsumer>{root => <div>{root.user.name}</div>}</RootConsumer>
    </RootProvider>);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('useRoot', () => {
    const { result } = renderHook(() => useRoot());
    expect(result.current.user).toEqual({});
    expect(result.current.menus).toBeUndefined();
    expect(result.current.data).toEqual({});
  });

  test('useUesr', () => {
    const { result } = renderHook(() => useUesr());
    expect(result.current).toEqual({});
  });

  test('useMenus', () => {
    const { result } = renderHook(() => useMenus());
    expect(result.current).toBeUndefined();
  });

  test('useData', () => {
    const { result } = renderHook(() => useData());
    expect(result.current).toEqual({});
  });

  test('data key', () => {
    const root = new RootStore<any, any>({ data: { a: 'a' } });
    render(<RootProvider value={root}>
      <DataConsumer name="a" />
    </RootProvider>);
    expect(screen.getByText('a')).toBeInTheDocument();
  });
});
