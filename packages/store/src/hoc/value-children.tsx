import React from 'react';

import { RenderValue } from '../components/render-value';

export type WithValueChildrenProps<T extends Object = Record<string, any>> = Omit<T, 'children'> & {
  children?: React.ReactNode;
  value?: any;
};

export function withValueChildren<T extends Object = Record<string, any>>(C: React.ComponentClass<T> | React.FunctionComponent<T>) {
  return (props: WithValueChildrenProps<T>) => {
    const { value, children, ...args } = props;
    const cProps = args as T;
    return <C {...cProps} >{children ?? <RenderValue value={value} />}</C>;
  };
}
