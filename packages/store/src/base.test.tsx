import { BaseStore } from './base';

describe('BaseStore', () => {
  const store = new BaseStore({ defaultValues: { id: 1, name: '', type: 't1' }, api: {} });
  test('setValues', () => {
    store.setValues({ name: 'name' });
    expect(store.values).toEqual({ id: 1, name: 'name', type: 't1' });
  });

  test('resetValues', () => {
    store.resetValues();
    expect(store.values).toEqual({ id: 1, name: '', type: 't1' });
  });

  test('setValuesByField', () => {
    store.setValuesByField('name', 'name');
    expect(store.values).toEqual({ id: 1, name: 'name', type: 't1' });
  });

  test('resetValuesByFields', () => {
    store.resetValuesByFields(['name']);
    expect(store.values).toEqual({ id: 1, name: '', type: 't1' });
    store.setValues({ id: 2, name: 'name', type: 't2' });
    store.resetValuesByFields(['name', 'type']);
    expect(store.values).toEqual({ id: 2, name: '', type: 't1' });
  });
});

