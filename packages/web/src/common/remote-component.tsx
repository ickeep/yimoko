import { observer } from '@formily/react';
import { RenderValue } from '@yimoko/store';
import { Key } from 'react';

import { CSSDeeps, JSDeep } from '../hook/use-load-depend';

import { LoadDepend, LoadDependProps } from './load-depend';

export type RemoteComponentProps<T extends object = Record<Key, any>> = T & Omit<LoadDependProps, 'js' | 'children' | 'component'> & {
  name: string
  js?: string
  css?: string
  jsDeep?: JSDeep
  cssDeep?: CSSDeeps
};

export const RemoteComponent: <T extends object = Record<Key, any>>(props: RemoteComponentProps<T>) => React.ReactElement | null = observer((props: RemoteComponentProps) => {
  const { name, js, css, props: p, jsDeep, cssDeep, spin, alert, ...args } = props;

  return (
    <LoadDepend js={jsDeep} css={cssDeep}>
      <LoadDepend js={{ name, src: js }} css={css} spin={spin} alert={alert}>
        <Component name={name} props={{ ...args, ...p }} />
      </LoadDepend>
    </LoadDepend>
  );
});

const Component = observer((props: Pick<RemoteComponentProps, 'name' | 'props'>) => {
  const { name, props: p } = props;
  const g = globalThis as Record<string, any>;

  return <RenderValue value={g[name]} props={p} />;
});
