import { BaseStore } from './base';
import { ListStore } from './list';
import { OperateStore } from './operate';

import { StoreMap } from '.';

describe('StoreMap', () => {
  test('store', () => {
    expect(StoreMap).toEqual({ base: BaseStore, list: ListStore, operate: OperateStore });
  });
});
