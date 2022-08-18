import { BaseStore, IHTTPRequest } from './base';

describe('BaseStore', () => {
  const defaultValues = { id: 1, name: '', type: 't1' };
  const store = new BaseStore({ defaultValues, api: { url: '' } });

  test('df', () => {
    const dfStore = new BaseStore({ api: {} });
    expect(dfStore.isFilterEmptyAtRun).toBeFalsy();
    expect(dfStore.isBindSearch).toBeFalsy();
    expect(dfStore.isRunNow).toBeFalsy();
    expect(dfStore.dictConfig).toEqual([]);
    expect(dfStore.fieldsConfig).toEqual({});
  });

  test('init run', () => {
    const res = { code: 0, msg: '', data: '' };
    const fn = jest.fn(async () => res);
    new BaseStore({ api: fn });
    expect(fn.mock.calls.length).toBe(0);
    new BaseStore({ api: fn, isRunNow: true });
    expect(fn.mock.calls.length).toBe(1);
    new BaseStore({ api: fn, isRunNow: false });
    expect(fn.mock.calls.length).toBe(1);
    new BaseStore({ api: fn, isRunNow: true, isBindSearch: true });
    expect(fn.mock.calls.length).toBe(1);
    new BaseStore({ api: fn, isRunNow: true, isBindSearch: false });
    expect(fn.mock.calls.length).toBe(2);
    new BaseStore({ api: fn, isRunNow: false, isBindSearch: true });
    expect(fn.mock.calls.length).toBe(2);
    new BaseStore({ api: fn, isRunNow: false, isBindSearch: false });
    expect(fn.mock.calls.length).toBe(2);
    new BaseStore({ api: fn, isBindSearch: true });
    expect(fn.mock.calls.length).toBe(2);
    new BaseStore({ api: fn, isBindSearch: false });
    expect(fn.mock.calls.length).toBe(2);
  });

  test('dictConfig', () => {
    expect(store.dictConfig).toEqual([]);
    const dictConfig = [{ field: 'type', data: [] }];
    const hasDictConfigStore = new BaseStore({ defaultValues, api: { url: '' }, dictConfig });
    expect(hasDictConfigStore.dictConfig).toEqual(dictConfig);
  });

  test('fieldsConfig', () => {
    expect(store.fieldsConfig).toEqual({});
    const fieldsConfig = { type: { type: 'string' } };
    const hasFieldsConfigStore = new BaseStore({ defaultValues, api: { url: '' }, fieldsConfig });
    expect(hasFieldsConfigStore.fieldsConfig).toEqual(fieldsConfig);
  });

  test('defaultValues', () => {
    expect(store.defaultValues).toEqual(defaultValues);
    expect(store.defaultValues !== defaultValues).toBeFalsy();
    expect(store.getDefaultValues()).toEqual(defaultValues);
    expect(store.getDefaultValues() !== defaultValues).toBeTruthy();
  });

  test('values', () => {
    expect(store.values).toEqual(defaultValues);
    const values = { value: 'val' };
    const hasValueStore = new BaseStore({ defaultValues: values, api: { url: '' } });
    expect(hasValueStore.values).toEqual(values);
  });

  test('setValues', () => {
    store.setValues({ name: 'name' });
    expect(store.values).toEqual({ id: 1, name: 'name', type: 't1' });
  });

  test('resetValues', () => {
    store.resetValues();
    expect(store.values).toEqual(defaultValues);
  });

  test('setValuesByField', () => {
    store.setValuesByField('name', 'name');
    expect(store.values).toEqual({ id: 1, name: 'name', type: 't1' });
  });

  test('resetValuesByFields', () => {
    store.resetValuesByFields(['name']);
    expect(store.values).toEqual(defaultValues);
    store.setValues({ id: 2, name: 'name', type: 't2' });
    store.resetValuesByFields(['name', 'type']);
    expect(store.values).toEqual({ id: 2, name: '', type: 't1' });
  });

  test('setValuesBySearch', () => {
    store.fieldsConfig = { id: { type: 'number' } };
    store.setValuesBySearch('?name=name&xxx=xxx&id=2');
    expect(store.values).toEqual({ id: 2, name: 'name', type: 't1' });
  });

  test('getURLSearch', () => {
    expect(store.getURLSearch()).toBe('id=2&name=name');
    store.setValues({ type: 't2' });
    expect(store.getURLSearch()).toBe('id=2&name=name&type=t2');
    store.setValues({ id: 1, type: 't1' });
    expect(store.getURLSearch()).toBe('name=name');

    // @ts-ignore
    store.setValues({ name: [] });
    expect(store.getURLSearch()).toBe('');

    store.setValues({ type: '' });
    expect(store.getURLSearch()).toBe('type=');

    store.setValues({ name: '', type: 't1' });
    expect(store.getURLSearch()).toBe('');
  });

  test('getAPIParams', () => {
    expect(store.getAPIParams()).toEqual({ id: 1, type: 't1', name: '' });
    store.isFilterEmptyAtRun = true;
    expect(store.getAPIParams()).toEqual({ id: 1, type: 't1' });
    store.isFilterEmptyAtRun = true;
    store.setValuesByField('obj', {});
    store.setValuesByField('arr', []);
    expect(store.values).toEqual({ ...defaultValues, obj: {}, arr: [] });
    expect(store.getAPIParams()).toEqual({ id: 1, type: 't1' });
  });

  test('apiExecutor', () => {
    expect(store.apiExecutor).toBeUndefined();
    const apiExecutor: IHTTPRequest = async () => ({ msg: '', code: 0, data: {} });
    const hasApiExecutorStore = new BaseStore({ defaultValues, api: { url: '' }, apiExecutor });
    expect(hasApiExecutorStore.apiExecutor).toBe(apiExecutor);
  });

  test('api', async () => {
    expect(store.api).toEqual({ url: '' });
    const api = async (p: any) => ({ msg: '', code: 0, data: p });;
    const hasApiStore = new BaseStore({ defaultValues, api, isFilterEmptyAtRun: true });
    expect(hasApiStore.api).toEqual(api);
    const res = { msg: '', code: 0, data: { id: 1, type: 't1' } };
    expect(await hasApiStore.runAPI()).toEqual(res);;
    expect(hasApiStore.response).toEqual(res);

    expect((await hasApiStore.runAPIByField('name', 'n1'))?.data.name).toBe('n1');
    expect(hasApiStore.response?.data.name).toBe('n1');

    expect((await hasApiStore.runAPIByValues({ name: 'n2' }))?.data.name).toBe('n2');
    expect(hasApiStore.response?.data.name).toBe('n2');

    expect((await hasApiStore.runAPIDataBySearch('name=n3'))?.data.name).toBe('n3');
    expect(hasApiStore.response?.data.name).toBe('n3');
  });

  test('lastFetchID', async () => {
    jest.useFakeTimers();
    const apiExecutor: IHTTPRequest = ({ time = 100 }) => new Promise(resolve => setTimeout(() => resolve({ msg: '', code: 0, data: time }), time));
    const hasApiExecutorStore = new BaseStore({ defaultValues: { time: 100 }, api: { url: '' }, apiExecutor });
    jest.useFakeTimers();
    hasApiExecutorStore.runAPIByField('time', 200);
    hasApiExecutorStore.runAPIByField('time', 100);

    jest.advanceTimersByTime(100);
    await jest.runAllTimers();
    expect(hasApiExecutorStore.response.data).toBe(100);
  });
});

