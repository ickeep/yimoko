import { BaseStore } from './base';

describe('BaseStore', () => {
  const store = new BaseStore({ defaultValues: { name: '' }, api: {} });
  test('adds 1 + 2 to equal 3', () => {
    store.setValues({ name: 'name' });
    expect(store.values).toEqual({ name: 'name' });
  });
});

