import { act, renderHook } from '@testing-library/react';

import { IHTTPResponse } from '../tools/api';

import { useAPISearchOptions } from './use-api-search-options';

describe('useAPISearchOptions', () => {
  test('data', () => {
    const { result } = renderHook(() => useAPISearchOptions('', '', 'a,b'));
    expect(result.current[0]).toEqual([{ label: 'a', value: 'a' }, { label: 'b', value: 'b' }]);
    expect(result.current[1]).toBeFalsy();
  });

  test('api', async () => {
    jest.useFakeTimers();
    const api = jest.fn((params: any) => Promise.resolve({ code: 0, msg: '', data: params?.name }));
    const { result, rerender } = renderHook((input: string) => useAPISearchOptions(input, '', '', api), { initialProps: '' });
    rerender('b');
    rerender('a');
    await act(async () => {
      jest.runAllTimers();
    });
    expect(api).toBeCalledTimes(1);
    expect(api).toBeCalledWith({ name: 'a' });
    expect(result.current[0]).toEqual([{ label: 'a', value: 'a' }]);
    expect(result.current[1]).toBeFalsy();
    rerender('b');
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current[1]).toBeTruthy();
    await act(async () => {
      jest.runAllTimers();
    });
    expect(result.current[0]).toEqual([{ label: 'b', value: 'b' }]);
    expect(result.current[1]).toBeFalsy();
  });

  test('labelAPI true', async () => {
    jest.useFakeTimers();
    const api = jest.fn((params: any) => Promise.resolve({ code: 0, msg: '', data: params?.id }));
    const { result, rerender } = renderHook((value: string) => useAPISearchOptions('', value, '', api, true), { initialProps: '' });
    rerender('b');
    rerender('a');
    await act(async () => {
      jest.runAllTimers();
    });
    expect(api).toBeCalledTimes(1);
    expect(api).toBeCalledWith({ id: 'a' });
    expect(result.current[0]).toEqual([{ label: 'a', value: 'a' }]);
    expect(result.current[1]).toBeFalsy();
    rerender('b');
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current[1]).toBeTruthy();
    await act(async () => {
      jest.runAllTimers();
    });
    expect(result.current[0]).toEqual([{ label: 'b', value: 'b' }]);
    expect(result.current[1]).toBeFalsy();
  });

  test('labelAPI {}', async () => {
    jest.useFakeTimers();
    const api = jest.fn((params: any) => Promise.resolve({ code: 0, msg: '', data: params?.id }));
    const { result, rerender } = renderHook((value: string) => useAPISearchOptions('', value, '', undefined, api), { initialProps: '' });
    rerender('b');
    rerender('a');
    await act(async () => {
      jest.runAllTimers();
    });
    expect(api).toBeCalledTimes(1);
    expect(api).toBeCalledWith({ id: 'a' });
    expect(result.current[0]).toEqual([{ label: 'a', value: 'a' }]);
    expect(result.current[1]).toBeFalsy();
    rerender('b');
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current[1]).toBeTruthy();
    await act(async () => {
      jest.runAllTimers();
    });
    expect(result.current[0]).toEqual([{ label: 'b', value: 'b' }]);
    expect(result.current[1]).toBeFalsy();
  });

  test('fetchId', async () => {
    jest.useFakeTimers();
    let time = 500;
    const api = jest.fn((params?: any) => new Promise<IHTTPResponse>((resolve) => {
      setTimeout(() => resolve({ code: 0, msg: '', data: params?.name }), time);
    }));
    const { result, rerender } = renderHook((input: string) => useAPISearchOptions(input, '', '', api), { initialProps: '' });
    rerender('a');
    await act(async () => {
      jest.runAllTimers();
    });
    expect(api).toBeCalledTimes(1);
    expect(api).toBeCalledWith({ name: 'a' });
    expect(result.current[0]).toEqual([{ label: 'a', value: 'a' }]);
    expect(result.current[1]).toBeFalsy();

    rerender('b');
    act(() => {
      jest.advanceTimersByTime(300);
    });
    time = 10;
    rerender('c');
    await act(async () => {
      jest.runAllTimers();
    });
    expect(api).toBeCalledTimes(3);
    expect(result.current[0]).toEqual([{ label: 'c', value: 'c' }]);
    expect(result.current[1]).toBeFalsy();
  });

  test('res err', async () => {
    jest.useFakeTimers();
    const api = jest.fn((params: any) => Promise.resolve({ code: 1, msg: '', data: params?.name }));
    const { result, rerender } = renderHook((input: string) => useAPISearchOptions(input, '', '', api), { initialProps: '' });
    rerender('a');
    await act(async () => {
      jest.runAllTimers();
    });
    expect(api).toBeCalledTimes(1);
    expect(api).toBeCalledWith({ name: 'a' });
    expect(result.current[0]).toEqual([]);
    expect(result.current[1]).toBeFalsy();
  });
});
