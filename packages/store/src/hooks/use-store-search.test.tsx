import { createForm } from '@formily/core';
import { act, render, renderHook } from '@testing-library/react';
import { Key } from 'react';

import { SchemaBox } from '../components/schema-box';
import { IStore } from '../store';
import { BaseStore } from '../store/base';
import { ListStore } from '../store/list';

import { useStoreSearch } from './use-store-search';

describe('useStoreSearch', () => {
  const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: '' }));
  const C = ({ search, store }: { search: string, store: IStore }) => {
    useStoreSearch(store, search);
    return null;
  };
  let baseStore = new BaseStore({ defaultValues: { a: '' }, api: {}, apiExecutor });

  beforeEach(() => {
    baseStore = new BaseStore({ defaultValues: { a: '' }, api: {}, apiExecutor });
  });

  test('baseStore', () => {
    renderHook((search: string) => useStoreSearch(baseStore, search), { initialProps: '?a=a' });
    expect(baseStore.values.a).toBe('');
  });

  test('isBindSearch', () => {
    baseStore.isBindSearch = true;
    renderHook((search: string) => useStoreSearch(baseStore, search), { initialProps: '?a=a' });
    expect(baseStore.values.a).toBe('a');

    renderHook((search: Record<Key, any>) => useStoreSearch(baseStore, search), { initialProps: { a: '1', b: null, c: undefined } });
    expect(baseStore.values.a).toBe('1');
    expect(baseStore.values.b).toBe(null);
    expect(baseStore.values.c).toBe(undefined);
  });

  test('isRunNow', () => {
    baseStore.isRunNow = true;
    renderHook((search: string) => useStoreSearch(baseStore, search), { initialProps: '?a=a' });
    expect(baseStore.values.a).toBe('');
  });

  test('isRunNow isBindSearch', () => {
    baseStore.isBindSearch = true;
    baseStore.isRunNow = true;
    renderHook((search: string) => useStoreSearch(baseStore, search), { initialProps: '?a=a' });
    expect(baseStore.values.a).toBe('a');
  });

  test('listStore', () => {
    const listStore = new ListStore({ defaultValues: { a: '' }, api: {}, apiExecutor });
    expect(apiExecutor).not.toBeCalled();
    const { rerender } = renderHook((search: string) => useStoreSearch(listStore, search), { initialProps: '?a=a' });
    expect(apiExecutor).toBeCalledWith({ params: { a: 'a', page: 1, pageSize: 20 } });
    expect(listStore.values.a).toEqual('a');
    rerender('?a=a2');
    expect(apiExecutor).toBeCalledWith({ params: { a: 'a2', page: 1, pageSize: 20 } });
    expect(listStore.values.a).toEqual('a2');
    rerender('?a=a2');
    expect(apiExecutor.mock.calls.length).toBe(2);
  });

  test('listStore isRunNow false', () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: {} }));
    const listStore = new ListStore({ defaultValues: { a: '' }, isRunNow: false, api: {}, apiExecutor });
    expect(apiExecutor).not.toBeCalled();
    const { rerender } = renderHook((search: string) => useStoreSearch(listStore, search), { initialProps: '?a=a' });
    expect(listStore.values.a).toEqual('a');
    expect(apiExecutor).not.toBeCalled();
    rerender('?a=a2');
    expect(apiExecutor).toBeCalledWith({ params: { a: 'a2', page: 1, pageSize: 20 } });
    expect(listStore.values.a).toEqual('a2');
    expect(apiExecutor.mock.calls.length).toBe(1);
    rerender('?a=a2');
    expect(apiExecutor.mock.calls.length).toBe(1);
  });

  test('listStore default not empty', () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: {} }));
    const listStore = new ListStore({ defaultValues: { a: 'a', empty: '' }, isRunNow: false, api: {}, apiExecutor });
    const { rerender } = renderHook((search: string) => useStoreSearch(listStore, search), { initialProps: '' });
    expect(listStore.values.a).toEqual('a');
    expect(apiExecutor).not.toBeCalled();
    rerender('?a=');
    expect(apiExecutor).toBeCalledWith({ params: { page: 1, pageSize: 20 } });
    expect(listStore.values.a).toEqual('');
    expect(apiExecutor.mock.calls.length).toBe(1);
    rerender('');
    expect(apiExecutor).toBeCalledWith({ params: { a: 'a', page: 1, pageSize: 20 } });
    expect(apiExecutor.mock.calls.length).toBe(2);
  });

  test('listStore isEmpty', () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: {} }));
    const listStore = new ListStore({ defaultValues: { a: '' }, isRunNow: false, api: {}, apiExecutor });
    expect(apiExecutor).not.toBeCalled();
    const { rerender } = renderHook((search: string) => useStoreSearch(listStore, search), { initialProps: '' });
    expect(listStore.values.a).toEqual('');
    expect(apiExecutor).not.toBeCalled();
    rerender('');
    expect(apiExecutor).not.toBeCalled();
    rerender('?a=a2');
    expect(apiExecutor).toBeCalledWith({ params: { a: 'a2', page: 1, pageSize: 20 } });
    expect(listStore.values.a).toEqual('a2');
  });

  test('listStore form', async () => {
    const apiExecutor = jest.fn(() => Promise.resolve({ code: 0, msg: '', data: {} }));
    const listStore = new ListStore({ defaultValues: { a: '' }, api: {}, apiExecutor });
    const form = createForm({ values: { a: '' } });
    await act(async () => {
      render(<SchemaBox model={form}> <C search="?a=a" store={listStore} /></SchemaBox>);
    });
    expect(apiExecutor).toBeCalledWith({ params: { a: 'a', page: 1, pageSize: 20 } });
  });
});
