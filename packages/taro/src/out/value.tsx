import { observer } from '@formily/react';
import { StandardProps } from '@tarojs/components';
import { JSONStringify, judgeIsEmpty } from '@yimoko/store';
import { isValidElementType } from 'react-is';

import { Text } from './text';

export interface ValueProps extends StandardProps {
  value?: any
  [key: string]: any
}

// eslint-disable-next-line complexity
export const Value = observer((props: ValueProps) => {
  const { value, ...args } = props;
  if (judgeIsEmpty(value)) {
    return null;
  }
  const type = typeof value;
  if (type === 'string') {
    return <Text {...args}>{value}</Text>;
  }

  if (isValidElementType(value)) {
    const C: any = value;
    return <C {...args} />;
  }

  if (type === 'object') {
    if (value.default && value.__esModule) {
      return <Value {...args} value={value.default} />;
    }
    return <Text {...args}>{JSONStringify(value)}</Text>;
  }

  return <Text {...args}>{String(value)}</Text>;
});
