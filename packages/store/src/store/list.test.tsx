import { IHTTPRequest } from './base';
import { defaultKeysConfig, ListStore } from './list';

describe('ListStore', () => {
  test('df', () => {
    const store = new ListStore();
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

  test('loadData', () => {
    const store = new ListStore({});
    const data = [{ a: 'a' }];
    store.loadData(data);
    expect(store.response.data).toBeUndefined();
    expect(store.listData).toEqual([]);
    store.setResponse({ code: 0, data });
    expect(store.listData).toEqual(data);
    expect(store.response.data).toEqual(data);
    store.loadData(data);
    expect(store.listData).toEqual([{ a: 'a' }, { a: 'a' }]);
    expect(store.response.data).toEqual([{ a: 'a' }, { a: 'a' }]);

    store.setResponse({ code: 0, data: { data } });
    expect(store.listData).toEqual(data);
    expect(store.response.data).toEqual({ data });
    store.loadData(data);
    expect(store.listData).toEqual([{ a: 'a' }, { a: 'a' }]);
    expect(store.response.data).toEqual({ data: [{ a: 'a' }, { a: 'a' }] });

    // @ts-ignore
    store.loadData({ a: 'a' });
    expect(store.listData).toEqual([{ a: 'a' }, { a: 'a' }]);

    // @ts-ignore
    store.loadData({});
    expect(store.listData).toEqual([{ a: 'a' }, { a: 'a' }]);
  });

  test('loadMore', async () => {
    let res = { code: 0, msg: '', data: { data: [{ a: 'a' }, { b: 'b' }], page: 1, pageSize: 2, count: 30 } };
    const apiExecutor: IHTTPRequest = () => new Promise(resolve => setTimeout(() => resolve(res), 10));
    const store = new ListStore({ defaultValues: {}, apiExecutor, api: { url: '' } });
    expect(store.moreLoading).toBeFalsy();
    expect(store.isNoMore).toBeTruthy();
    store.setMoreLoading(true);
    expect(store.moreLoading).toBeTruthy();
    store.setMoreLoading(false);

    const api = store.runAPI();
    expect(store.moreLoading).toBeFalsy();
    expect(store.isNoMore).toBeTruthy();
    await api;
    expect(store.moreLoading).toBeFalsy();
    expect(store.isNoMore).toBeFalsy();

    res.data.page = 2;
    const loadMore = store.loadMore();
    expect(store.moreLoading).toBeTruthy();
    expect(store.isNoMore).toBeFalsy();
    await loadMore;
    expect(store.moreLoading).toBeFalsy();
    expect(store.isNoMore).toBeFalsy();
    expect(store.listData).toEqual([{ a: 'a' }, { b: 'b' }, { a: 'a' }, { b: 'b' }]);
    expect(store.values.page).toEqual(2);
    expect(store.moreResponse).toEqual(res);

    // 加载出错
    res.code = 1;
    const loadMore2 = store.loadMore();
    expect(store.moreLoading).toBeTruthy();
    expect(store.isNoMore).toBeFalsy();
    await loadMore2;
    expect(store.moreLoading).toBeFalsy();
    expect(store.isNoMore).toBeFalsy();
    expect(store.listData).toEqual([{ a: 'a' }, { b: 'b' }, { a: 'a' }, { b: 'b' }]);
    expect(store.moreResponse).toEqual(res);

    // res empty
    // @ts-ignore
    res = undefined;
    await store.loadMore();
    expect(store.moreLoading).toBeFalsy();
    expect(store.isNoMore).toBeFalsy();
    expect(store.listData).toEqual([{ a: 'a' }, { b: 'b' }, { a: 'a' }, { b: 'b' }]);

    // 加载完毕
    res = { code: 0, msg: '', data: { data: [{ a: 'a' }, { b: 'b' }], page: 3, pageSize: 2, count: 6 } };
    const loadMore3 = store.loadMore();
    expect(store.moreLoading).toBeTruthy();
    expect(store.isNoMore).toBeFalsy();
    await loadMore3;
    expect(store.moreLoading).toBeFalsy();
    expect(store.isNoMore).toBeTruthy();
    expect(store.listData).toEqual([{ a: 'a' }, { b: 'b' }, { a: 'a' }, { b: 'b' }, { a: 'a' }, { b: 'b' }]);
    expect(store.moreResponse).toEqual(res);

    store.setMoreResponse({ code: 0, data: { data: [{ a: 'a' }, { b: 'b' }], page: 3, pageSize: 2 } });
    // @ts-ignore 取 listData length
    store.loadMore();
    expect(store.moreLoading).toBeFalsy();
    expect(store.isNoMore).toBeTruthy();
  });
});
