import { observer } from '@formily/react';
import { RenderValue } from '@yimoko/store';
import { Key } from 'react';

import { CSSDeeps, JSDeep } from '../hook/use-load-depend';

import { LoadDepend } from './load-depend';

export interface RemoteComponentProps {
  name: string
  js?: string
  css?: string
  props?: Record<Key, any>
  jsDeep?: JSDeep
  cssDeep?: CSSDeeps
}

export const RemoteComponent = observer((props: RemoteComponentProps) => {
  const { name, js, css, props: p, jsDeep, cssDeep } = props;

  return (
    <LoadDepend js={jsDeep} css={cssDeep}>
      <LoadDepend js={{ name, src: js }} css={css}>
        <Component name={name} props={p} />
      </LoadDepend>
    </LoadDepend>
  );
});

const Component = observer((props: Pick<RemoteComponentProps, 'name' | 'props'>) => {
  const { name, props: p } = props;
  const g = globalThis as Record<string, any>;

  return <RenderValue value={g[name]} props={p} />;
});
