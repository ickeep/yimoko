import { action, define, observable } from '@formily/reactive';
import { pick } from 'lodash-es';

export type ILang = Record<string, string | Record<string, string>>;

export class LangStore<T extends ILang = ILang> {
  lang: T;
  loading = false;

  constructor(lang: T) {
    this.lang = lang;
    define(this, {
      lang: observable,
      loading: observable.ref,
      setLang: action,
      setLoading: action,
    });
  }

  getLang = (keys?: string | string[]) => {
    if (typeof keys === 'undefined') {
      return this.lang;
    }
    return pick(this.lang, keys);
  };

  setLang = (lang: T) => this.lang = lang;

  setLoading = (loading: boolean) => this.loading = loading;
}
