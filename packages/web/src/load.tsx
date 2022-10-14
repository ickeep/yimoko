import { HTMLAttributes, LinkHTMLAttributes, ScriptHTMLAttributes } from 'react';

export const loadElement = (name: string, attrs: HTMLAttributes<any> & Record<string, any>, place: 'body' | 'head' | HTMLElement = 'body'): Promise<boolean | Error> => (
  new Promise((resolve) => {
    const el = document.createElement(name);
    attrs && (Object.keys(attrs) as Array<keyof typeof attrs>).forEach(key => el.setAttribute(key, attrs[key]));
    el.onload = () => resolve(true);
    el.onerror = (e, source, lineno, colno, error) => {
      el.remove();
      resolve(error ?? new Error(`加载: ${el.outerHTML} 失败`));
    };
    if (place instanceof HTMLElement) {
      place.appendChild(el);
    } else {
      document[place]?.appendChild(el);
    }
  })
);

const loadingJSMap: Record<string, Promise<boolean | Error>> = {};

export const loadJS = async (name: string, src: string, attrs?: ScriptHTMLAttributes<any>) => {
  const global: Record<string, any> = globalThis;
  if (global[name]) {
    return true;
  }
  if (typeof loadingJSMap[name] === 'undefined') {
    loadingJSMap[name] = loadElement('script', { crossorigin: '', type: 'text/javascript', ...attrs, src });
  }
  const result = await loadingJSMap[name];
  delete loadingJSMap[name];
  if (result === true) {
    if (global[name] === undefined) {
      return new Error(`脚本加载成功,但 ${name} 未定义`);
    }
  }
  return result;
};

const loadingCSSMap: Record<string, Promise<boolean | Error>> = {};

export const loadCSS = async (href: string, attrs?: LinkHTMLAttributes<any>) => {
  const selector = `link[href='${href}']`;
  if (typeof loadingCSSMap[href] === 'undefined') {
    if (document.querySelector(selector)) {
      return true;
    }
    loadingCSSMap[href] = loadElement('link', { rel: 'stylesheet', ...attrs, href }, 'head');
  }
  const isSucceed = await loadingCSSMap[href];
  delete loadingCSSMap[href];
  return isSucceed;
};
