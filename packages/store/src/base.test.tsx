import { BaseStore } from './base';

describe('BaseStore', () => {
  const store = new BaseStore({ defaultValues: { name: '' }, api: {} });
  test('setValues', () => {
    store.setValues({ name: 'name' });
    expect(store.values).toEqual({ name: 'name' });
  });

  test('resetValues', () => {
    store.resetValues();
    expect(store.values).toEqual({ name: '' });
  });

  test('setValuesByField', () => {
    store.setValuesByField('name', 'name');
    expect(store.values).toEqual({ name: 'name' });
  });

  test('resetValuesByFields', () => {
    store.resetValuesByFields(['name']);
    expect(store.values).toEqual({ name: '' });
  });
});

