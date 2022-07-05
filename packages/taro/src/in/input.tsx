import { observer } from '@formily/react';
import { Input as TInput, InputProps as TInputProps } from '@tarojs/components';
import classNames from 'classnames';

import { useSize } from '../hooks/use-size';
import { Text } from '../out/text';
import { ISize } from '../props';

export interface InputProps extends TInputProps {
  size?: ISize
  onChange?: (value?: string) => void
  readOnly?: boolean
}

export const Input = observer((props: InputProps) => {
  const { onChange, onInput, size, className, readOnly, ...args } = props;
  const iSize = useSize(size);

  if (readOnly) {
    return <Text>{args.value}</Text>;
  }

  return (
    <TInput
      {...args}
      className={classNames('y-input', { [`y-input-${iSize}`]: iSize }, className)}
      onInput={(e) => {
        onInput?.(e);
        onChange?.(e.detail.value);
      }}
    />
  );
});
