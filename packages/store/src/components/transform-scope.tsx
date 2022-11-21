import { observer, useExpressionScope } from '@formily/react';
import { transform } from 'lodash-es';
import React, { Key } from 'react';

import { useDeepMemo } from '../hooks/use-deep-memo';
import { judgeIsEmpty } from '../tools/tool';

export interface TransformScopeProps {
  children: React.ReactElement
  [key: Key]: any;
}

// schema items 读取 $record 在某些场景 (table) 会存在与预想不匹配的情况 通过此组件可以解决
// 如 items 存在自定义排序 但是 $record 读取的是 默认 排序
// 通过在此组件中读取 $record 然后传与子组件, 以保证读取的是正确的 $record
const TExpRE = /^\s*<%([\s\S]*)%>\s*$/;
export const TransformScope = observer((props: TransformScopeProps) => {
  const { children, ...args } = props;
  const scope = useExpressionScope();

  const curProps = useDeepMemo(() => (judgeIsEmpty(args) || judgeIsEmpty(scope) ? {} : transformValue(args, scope)), [args]);

  if (judgeIsEmpty(curProps)) {
    return children;
  }
  return React.cloneElement(children, curProps);
});

// eslint-disable-next-line complexity
export const transformValue = (value: any, scope: any): any => {
  if (judgeIsEmpty(scope)) {
    return value;
  }
  if (typeof value === 'string' && TExpRE.test(value)) {
    try {
      // eslint-disable-next-line no-new-func
      return new Function('$root', `with($root) { return (${value.replace(TExpRE, '$1')}); }`)(scope);
    } catch (error) {
      console.error(error);
      return value;
    }
  }
  if (Array.isArray(value)) {
    return transform(value, (result, item) => {
      const newRes = result as any[];
      newRes.push(transformValue(item, scope));
    }, []);
  }
  if (value && typeof value === 'object') {
    return transform(value, (result, item, key) => {
      const newRes = result as any;
      newRes[key] = transformValue(item, scope);
    }, {});
  }

  return value;
};
