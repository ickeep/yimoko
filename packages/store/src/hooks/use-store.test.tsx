import { renderHook } from '@testing-library/react';

import { useStore } from './use-store';

describe('useStore', () => {
  test('useStore', () => {
    const { result: { current: store } } = renderHook(() => useStore({ api: {} }));
    expect(store.api).toEqual({});
    expect(store.apiExecutor).toBeDefined();
  });

  test('apiExecutor', () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: '' }));
    const { result: { current: store } } = renderHook(() => useStore({ api: {}, apiExecutor }));
    expect(store.apiExecutor).toEqual(apiExecutor);
  });
});
