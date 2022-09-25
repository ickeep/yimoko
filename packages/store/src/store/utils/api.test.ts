import { isMethodPost, runStoreAPI } from './api';

describe('api', () => {
  test('isMethodPost', () => {
    expect(isMethodPost('POST')).toBe(true);
    expect(isMethodPost('PUT')).toBe(true);
    expect(isMethodPost('PATCH')).toBe(true);
    expect(isMethodPost('GET')).toBe(false);
    expect(isMethodPost('DELETE')).toBe(false);
    expect(isMethodPost()).toBe(false);

    expect(isMethodPost('post')).toBe(true);
    expect(isMethodPost('put')).toBe(true);
    expect(isMethodPost('patch')).toBe(true);
    expect(isMethodPost('get')).toBe(false);
    expect(isMethodPost('delete')).toBe(false);
  });

  test('runStoreAPI', async () => {
    const res = { code: 0, msg: '', data: '' };
    const params = { a: 'a' };
    const apiExecutor = jest.fn(async () => res);

    expect(await runStoreAPI()).toBeUndefined();

    const r1 = await runStoreAPI({ method: 'POST' }, apiExecutor, params);
    expect(r1).toEqual(res);
    expect(apiExecutor).toHaveBeenLastCalledWith({ method: 'POST', data: params });

    await runStoreAPI<any>({ method: 'POST', data: { d: 'd' } }, apiExecutor, params);
    expect(apiExecutor).toHaveBeenLastCalledWith({ method: 'POST', data: { d: 'd', ...params } });

    const r2 = await runStoreAPI({}, apiExecutor, params);
    expect(r2).toEqual(res);
    expect(apiExecutor).toHaveBeenLastCalledWith({ params });

    await runStoreAPI({ params: { d: 'd' } }, apiExecutor, params);
    expect(apiExecutor).toHaveBeenLastCalledWith({ params: { d: 'd', ...params } });

    const apiFn = jest.fn(async () => res);
    await runStoreAPI(apiFn, apiExecutor, params);
    expect(apiFn).toHaveBeenLastCalledWith(params);
  });
});
