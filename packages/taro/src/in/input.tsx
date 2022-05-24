import { observer } from '@formily/reactive-react';
import { Input as TInput, InputProps as TInputProps } from '@tarojs/components';
import classNames from 'classNames';

import { Text } from '../out/text';

export interface InputProps extends TInputProps {
  onChange?: (value?: string) => void
  readOnly?: boolean
}

export const Input = observer((props: InputProps) => {
  const { onChange, onInput, className, readOnly, ...args } = props;
  if (readOnly) {
    return <Text>{args.value}</Text>;
  }

  return (
    <TInput
      {...args}
      className={classNames('y-input', className)}
      onInput={(e) => {
        onInput?.(e);
        onChange?.(e.detail.value);
      }}
    />
  );
});
