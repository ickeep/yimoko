import { OperateStore } from './operate';

describe('OperateStore', () => {
  test('df', () => {
    const store = new OperateStore();
    expect(store.isFilterEmptyAtRun).toBeFalsy();
    expect(store.isBindSearch).toBeFalsy();
    expect(store.isRunNow).toBeFalsy();
  });
});
