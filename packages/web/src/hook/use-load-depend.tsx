import { useConfig } from '@yimoko/store';
import { useEffect, useMemo, useState } from 'react';

import { loadCSS, loadJS } from '../load';
import { IConfig } from '../store/config';
import { getAutoHref } from '../tool';

export interface IJS {
  name: string;
  src?: string;
}

export type JSDeep = IJS[] | IJS;
export type CSSDeeps = string | string[];

export const useLoadDepend = (deep: [(JSDeep | undefined), CSSDeeps | undefined]): [boolean, Array<false | Error>, () => Promise<Array<boolean | Error>>] => {
  const { static: { js, css } } = useConfig<IConfig>();
  const [isLoading, setLoading] = useState(true);
  const [errs, setErrs] = useState<Array<false | Error>>([]);
  const [jsDeep, cssDeep] = deep;
  const jsArr = useMemo(
    () => (!jsDeep
      ? []
      : (Array.isArray(jsDeep) ? jsDeep : [jsDeep]).map(({ name, src }) => ({ name, src: src ? getAutoHref(src, js) : `${js + name}.js` }))),
    [js, jsDeep],
  );
  const cssArr = useMemo(() => (!cssDeep ? [] : (Array.isArray(cssDeep) ? cssDeep : [cssDeep]).map(href => getAutoHref(href ?? '', css))), [css, cssDeep]);

  const load = useMemo(() => () => {
    const pArr = [
      ...cssArr.map(href => loadCSS(href)),
      ...jsArr.map(({ name, src }) => loadJS(name, src)),
    ];
    return Promise.all(pArr);
  }, [jsArr, cssArr]);

  useEffect(() => {
    setLoading(true);
    load().then((result) => {
      setLoading(false);
      const err = result.filter(r => r !== true) as Array<false | Error>;
      setErrs(err);
    });
  }, [load]);

  return [isLoading, errs, load];
};
