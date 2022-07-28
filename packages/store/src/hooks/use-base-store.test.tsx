import { renderHook } from '@testing-library/react';

import { useBaseStore } from './use-base-store';

describe('useBaseStore', () => {
  test('useBaseStore', () => {
    const { result: { current: store } } = renderHook(() => useBaseStore({ api: {} }));
    expect(store.api).toEqual({});
    expect(store.apiExecutor).toBeDefined();
  });

  test('apiExecutor', () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: '' }));
    const { result: { current: store } } = renderHook(() => useBaseStore({ api: {}, apiExecutor }));
    expect(store.apiExecutor).toEqual(apiExecutor);
  });
});
