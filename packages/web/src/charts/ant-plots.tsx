import * as plots from '@ant-design/plots';

import { observer } from '@formily/react';
import { useConfig } from '@yimoko/store';
import { Key, ReactNode } from 'react';

import { LoadDepend } from '../common/load-depend';
import { IConfig } from '../store/config';

export const LoadDependAntPlots = observer((props: { children?: ReactNode }) => {
  const { deep: { antPlots } } = useConfig<IConfig>();
  return <LoadDepend {...antPlots}>{props.children}</LoadDepend>;
});

// hoc 转换组件 props 使其支持 模版
export function withAntPlots<T extends Object = Record<Key, any>>(C: React.ComponentClass<T> | React.FunctionComponent<T>) {
  return (props: T) => <LoadDependAntPlots><C {...props} /></LoadDependAntPlots>;
}

// @ts-ignore
export const AntPlots: typeof plots = {};
// @ts-ignore
Object.keys(plots).forEach((key: keyof typeof plots) => AntPlots[key] = /^[A-Z]/.test(String(key)) ? withAntPlots(plots[key]) : plots[key]);
