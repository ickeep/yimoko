import { renderHook } from '@testing-library/react';

import { BaseStore } from '../store/base';
import { ListStore } from '../store/list';

import { useStore } from './use-store';

describe('useStore', () => {
  test('store', () => {
    const baseStore = new BaseStore({ api: {} });
    const { result: { current: store } } = renderHook(() => useStore(baseStore));
    expect(store.api).toEqual({});
    expect(store.apiExecutor).toBeDefined();
  });

  test('store apiExecutor', () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: '' }));
    const baseStore = new BaseStore({ api: {}, apiExecutor });
    const { result: { current: store } } = renderHook(() => useStore(baseStore));
    expect(store.api).toEqual({});
    expect(store.apiExecutor).toEqual(apiExecutor);
  });

  test('base', () => {
    const { result: { current: store } } = renderHook(() => useStore({ api: {} }));
    expect(store.api).toEqual({});
    expect(store instanceof BaseStore).toBeTruthy();
    expect(store.apiExecutor).toBeDefined();
  });

  test('list', () => {
    const { result: { current: store } } = renderHook(() => useStore({ api: {}, type: 'list' }));
    expect(store.api).toEqual({});
    expect(store instanceof ListStore).toBeTruthy();
    expect(store.apiExecutor).toBeDefined();
  });

  test('apiExecutor', () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: '' }));
    const { result: { current: store } } = renderHook(() => useStore({ api: {}, apiExecutor }));
    expect(store.apiExecutor).toEqual(apiExecutor);
  });
});
