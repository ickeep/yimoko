import { isValidElement, Key } from 'react';
import { isValidElementType } from 'react-is';

import { JSONStringify, judgeIsEmpty } from '../tools/tool';

export interface RenderValueProps {
  value?: any
  props?: Record<Key, any>
}

// eslint-disable-next-line complexity
export const RenderValue = (props: RenderValueProps) => {
  const { value, props: cProps } = props;
  const type = typeof value;

  if (judgeIsEmpty(value)) {
    return null;
  }
  if (isValidElement(value) || type === 'string') {
    return value;
  }

  if (isValidElementType(value)) {
    const C: any = value;
    return <C {...cProps} />;
  }

  const typeFnMap: Record<Key, any> = {
    boolean: () => String(value),
    number: () => String(value),
    bigint: () => String(value),
    // esModule
    object: () => (value.default && value.__esModule ? <RenderValue props={cProps} value={value.default} /> : JSONStringify(value)
    ),
  };

  return typeFnMap[type]?.();
};
