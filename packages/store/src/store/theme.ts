import { define, observable, action } from '@formily/reactive';

export type ITheme = Record<string, string | number>;

export class ThemeStore<T extends object = ITheme> {
  theme: T;
  constructor(theme: T) {
    this.theme = theme;
    define(this, {
      theme: observable,
      setTheme: action,
    });
  }

  setTheme = (theme: Partial<T>) => this.theme = Object.assign(this.theme, theme);
}
