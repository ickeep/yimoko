import { judgeIsSuccess, judgeIsUnauthorized, judgeIsForbidden, judgeIsNetworkError, getCodeByStatus } from './api';

describe('api', () => {
  test('judgeIsSuccess', () => {
    expect(judgeIsSuccess({ code: 0 })).toBeTruthy();
    expect(judgeIsSuccess({ code: 1 })).toBeFalsy();
    expect(judgeIsSuccess({})).toBeFalsy();
  });

  test('judgeIsUnauthorized', () => {
    expect(judgeIsUnauthorized({ code: 401 })).toBeTruthy();
    expect(judgeIsUnauthorized({ code: 0 })).toBeFalsy();
    expect(judgeIsUnauthorized({ code: 1 })).toBeFalsy();
    expect(judgeIsUnauthorized({})).toBeFalsy();
  });

  test('judgeIsForbidden', () => {
    expect(judgeIsForbidden({ code: 403 })).toBeTruthy();
    expect(judgeIsForbidden({ code: 0 })).toBeFalsy();
    expect(judgeIsForbidden({ code: 1 })).toBeFalsy();
    expect(judgeIsForbidden({})).toBeFalsy();
  });

  test('judgeIsNetworkError', () => {
    expect(judgeIsNetworkError({ code: 600 })).toBeTruthy();
    expect(judgeIsNetworkError({ code: 0 })).toBeFalsy();
    expect(judgeIsNetworkError({ code: 1 })).toBeFalsy();
    expect(judgeIsNetworkError({})).toBeFalsy();
  });

  test('getCodeByStatus', () => {
    expect(getCodeByStatus(1)).toBe(1);
    expect(getCodeByStatus(200)).toBe(0);
    expect(getCodeByStatus(201)).toBe(0);
    expect(getCodeByStatus(299)).toBe(0);
    expect(getCodeByStatus(300)).toBe(300);
    expect(getCodeByStatus(401)).toBe(401);
    expect(getCodeByStatus(403)).toBe(403);
    expect(getCodeByStatus(600)).toBe(600);
  });
});
