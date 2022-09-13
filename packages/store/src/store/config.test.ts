import { renderHook } from '@testing-library/react';

import { ConfigStore, unknownAPIRes, useAPIExecutor, useConfig, useConfigStore, useLogger, useNotifier } from './config';

describe('ConfigStore', () => {
  test('ConfigStore', () => {
    const apiExecutor = jest.fn();
    const notifier = jest.fn();
    const configStore = new ConfigStore({ a: 'a', b: 'b', c: 'c' }, { apiExecutor, notifier });
    expect(configStore.config).toEqual({ a: 'a', b: 'b', c: 'c' });
    expect(configStore.apiExecutor).toBe(apiExecutor);
    expect(configStore.notifier).toBe(notifier);

    const log = jest.spyOn(console, 'info').mockImplementation(() => { });
    configStore.logger('test');
    expect(log).toBeCalledWith('test');

    const report = jest.fn();
    configStore.report = report;
    configStore.logger('test');
    expect(report).toBeCalledWith('test', 'info');

    const configStore1 = new ConfigStore({}, { apiExecutor, notifier, report });
    configStore1.report = report;
    configStore1.logger('test');
    expect(report).toBeCalledWith('test', 'info');
  });

  test('useConfigStore', async () => {
    const { result: { current: configStore } } = renderHook(() => useConfigStore());

    expect(configStore.config).toEqual({});
    expect(configStore.apiExecutor).toBeInstanceOf(Function);
    expect(configStore.notifier).toBeInstanceOf(Function);
    expect(configStore.logger).toBeInstanceOf(Function);

    const info = jest.spyOn(console, 'info').mockImplementation(() => { });
    const log = jest.spyOn(console, 'log').mockImplementation(() => { });
    configStore.logger('test');
    expect(info).toBeCalledWith('test');
    expect(await configStore.apiExecutor({})).toEqual(unknownAPIRes);
    configStore.notifier('test', 'info');
    expect(log).toBeCalledWith('未配置 notifier');
  });

  test('useLogger', () => {
    const { result: { current: logger } } = renderHook(() => useLogger());
    const info = jest.spyOn(console, 'info').mockImplementation(() => { });
    logger('test');
    expect(info).toBeCalledWith('test');
  });

  test('useAPIExecutor', async () => {
    const { result: { current: apiExecutor } } = renderHook(() => useAPIExecutor());
    expect(await apiExecutor({})).toEqual(unknownAPIRes);
  });

  test('useNotifier', () => {
    const { result: { current: notifier } } = renderHook(() => useNotifier());
    const log = jest.spyOn(console, 'log').mockImplementation(() => { });
    notifier('test', 'info');
    expect(log).toBeCalledWith('未配置 notifier');
  });

  test('useConfig', () => {
    const { result: { current: configStore } } = renderHook(() => useConfigStore());
    const { result: { current: config } } = renderHook(() => useConfig());
    expect(config).toEqual({});
    configStore.setConfig({ a: 'a', b: 'b', c: 'c' });
    expect(config).toEqual({ a: 'a', b: 'b', c: 'c' });
  });
});
