import { renderHook } from '@testing-library/react';

import { ListStore } from '../store/list';

import { useListStore } from './use-list-store';

describe('useListStore', () => {
  test('useListStore', () => {
    const { result: { current: store } } = renderHook(() => useListStore({ api: {} }));
    expect(store.api).toEqual({});
    expect(store.apiExecutor).toBeDefined();
  });

  test('apiExecutor', () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: '' }));
    const { result: { current: store } } = renderHook(() => useListStore({ api: {}, apiExecutor }));
    expect(store.apiExecutor).toEqual(apiExecutor);
    expect(store instanceof ListStore).toBeTruthy();
  });
});
