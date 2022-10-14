import { observer } from '@formily/react';
import { act, render, screen, renderHook } from '@testing-library/react';

import { RootStore } from '../store/root';

import { RootProvider, RootConsumer, useUser as useUser, useRoot, useMenus, useData } from './root';

const NameConsumer = observer(() => {
  const { name } = useUser();
  return <div>{name ?? 'unknown'}</div>;
});

const DataConsumer = observer(({ name }: { name?: string }) => {
  const val = useData(name);
  return <div>{val}</div>;
});

describe('RootStore', () => {
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

  test('useUser', () => {
    const { result } = renderHook(() => useUser());
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
