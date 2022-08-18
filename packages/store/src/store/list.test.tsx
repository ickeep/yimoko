import { defaultKeysConfig, ListStore } from './list';

describe('ListStore', () => {
  test('df', () => {
    const store = new ListStore({ api: {} });
    expect(store.isFilterEmptyAtRun).toBeTruthy();
    expect(store.isBindSearch).toBeTruthy();
    expect(store.isRunNow).toBeTruthy();
    expect(store.selectedRowKeys).toEqual([]);
    expect(store.keysConfig).toEqual(defaultKeysConfig);
    expect(store.queryRoutingType).toBe('push');
    expect(store.defaultValues).toEqual({ page: 1, pageSize: 20, sortOrder: [] });
  });

  test('config', () => {
    const store = new ListStore({
      api: {},
      isBindSearch: false,
      isRunNow: false,
      isFilterEmptyAtRun: false,
      queryRoutingType: 'replace',
      keysConfig: { page: 'p', sortOrder: 'so' },
      defaultValues: { a: 'a' },
    });
    expect(store.isFilterEmptyAtRun).toBeFalsy();
    expect(store.isBindSearch).toBeFalsy();
    expect(store.isRunNow).toBeFalsy();
    expect(store.keysConfig).toEqual({ ...defaultKeysConfig, page: 'p', sortOrder: 'so' });
    expect(store.queryRoutingType).toBe('replace');
    expect(store.defaultValues).toEqual({ p: 1, pageSize: 20, so: [], a: 'a' });
  });

  test('setSelectedRowKeys', () => {
    const store = new ListStore({ api: {} });
    expect(store.selectedRowKeys).toEqual([]);
    store.setSelectedRowKeys([1, 2]);
    expect(store.selectedRowKeys).toEqual([1, 2]);
    store.setSelectedRowKeys();
    expect(store.selectedRowKeys).toEqual([]);
  });

  test('listData', () => {
    const store = new ListStore({ api: {} });
    expect(store.listData).toEqual([]);
    const arr: any[] = [
      { data: '', result: [] },
      { data: { data: false }, result: [] },
      { data: [{ a: 'a' }], result: [{ a: 'a' }] },
      { data: { data: [{ a: 'a' }] }, result: [{ a: 'a' }] },
    ];
    arr.forEach(({ data, result }) => {
      store.setResponse({ code: 0, data });
      expect(store.listData).toEqual(result);
    });
  });
});
