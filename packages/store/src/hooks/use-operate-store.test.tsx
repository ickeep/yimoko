import { renderHook } from '@testing-library/react';

import { OperateStore } from '../store/operate';

import { useOperateStore } from './use-operate-store';

describe('useOperateStore', () => {
  test('useOperateStore', () => {
    const { result: { current: store } } = renderHook(() => useOperateStore({ api: {} }));
    expect(store.api).toEqual({});
    expect(store.apiExecutor).toBeDefined();
  });

  test('apiExecutor', () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: '' }));
    const { result: { current: store } } = renderHook(() => useOperateStore({ api: {}, apiExecutor }));
    expect(store.apiExecutor).toEqual(apiExecutor);
    expect(store instanceof OperateStore).toBeTruthy();
  });
});
