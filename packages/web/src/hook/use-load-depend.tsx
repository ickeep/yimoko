import { getAutoArr, getAutoHref, useConfig, useDeepMemo } from '@yimoko/store';
import { useEffect, useMemo, useState } from 'react';

import { loadCSS, loadJS } from '../load';
import { IConfig } from '../store/config';

export interface IJS {
  name: string;
  src?: string;
}

export type JSDeep = IJS[] | IJS;
export type CSSDeeps = string | string[];

export type IDeep = [JSDeep | undefined, CSSDeeps | undefined] | [JSDeep];

export const useLoadDepend = (deep: IDeep): [boolean, Array<false | Error>, () => Promise<Array<boolean | Error>>] => {
  const { static: { js = '', css = '' } = {}, version = {}, versionKey } = useConfig<IConfig>();
  const [isLoading, setLoading] = useState(true);
  const [errs, setErrs] = useState<Array<false | Error>>([]);
  const [jsDeep, cssDeep] = deep;

  const jsArr = useMemo(
    () => (getAutoArr(jsDeep)).map(({ name, src }) => ({ name, src: src ? getAutoHref(src, js, version.js, name, versionKey) : `${js + name}.js` })),
    [js, jsDeep, version.js, versionKey],
  );

  const cssArr = useMemo(
    () => (getAutoArr(cssDeep)).map(href => getAutoHref(href, css, version.css, versionKey)),
    [css, cssDeep, version.css, versionKey],
  );

  const load = useDeepMemo(() => () => {
    setLoading(true);
    const pArr = [
      ...cssArr.map(href => loadCSS(href)),
      ...jsArr.map(({ name, src }) => loadJS(name, src)),
    ];

    const p = Promise.all(pArr);
    p.then((result) => {
      setLoading(false);
      const err = result.filter(r => r !== true) as Array<false | Error>;
      setErrs(err);
    });
    return p;
  }, [jsArr, cssArr]);

  useEffect(() => {
    load();
  }, [load]);

  return [isLoading, errs, load];
};
