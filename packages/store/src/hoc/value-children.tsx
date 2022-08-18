import React, { useMemo } from 'react';

import { RenderValue } from '../components/render-value';
import { judgeIsEmpty } from '../tools/tool';

export type WithValueChildrenProps<T extends Object = Record<string, any>> = Omit<T, 'children'> & {
  children?: React.ReactNode;
  value?: any;
};

export function withValueChildren<T extends Object = Record<string, any>>(C: React.ComponentClass<T> | React.FunctionComponent<T>) {
  return (props: WithValueChildrenProps<T>) => {
    const { value, children, ...args } = props;
    const curChildren = useMemo(() => {
      if (typeof children !== 'undefined') {
        return children;
      }
      if (judgeIsEmpty(value)) {
        return null;
      }
      // 可交互插件 例如 antd Typography 的 复制 可取其值
      if (['string', 'boolean', 'number', 'bigint'].includes(typeof value)) {
        return String(value);
      }
      return <RenderValue value={value} />;
    }, [children, value]);

    const cProps = args as T;

    return <C {...cProps} >{curChildren}</C>;
  };
}
