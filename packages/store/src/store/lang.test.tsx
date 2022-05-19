import { LangStore } from './lang';

describe('langStore', () => {
  const defaultLang = { name: 'name', type: 'type' };
  const langStore = new LangStore(defaultLang);

  test('lang', () => {
    expect(langStore.lang).toEqual(defaultLang);
  });

  test('loading', () => {
    expect(langStore.loading).toBeFalsy();
  });

  test('getLang', () => {
    expect(langStore.getLang()).toEqual(defaultLang);
    expect(langStore.getLang('name')).toEqual({ name: 'name' });
    expect(langStore.getLang(['name'])).toEqual({ name: 'name' });
    expect(langStore.getLang(['name', 'type'])).toEqual({ name: 'name', type: 'type' });
  });

  test('setLang', () => {
    langStore.setLang({ name: '名字', type: '类型' });
    expect(langStore.lang).toEqual({ name: '名字', type: '类型' });
  });

  test('setLoading', () => {
    langStore.setLoading(true);
    expect(langStore.loading).toBeTruthy();
    langStore.setLoading(false);
    expect(langStore.loading).toBeFalsy();
  });
});
