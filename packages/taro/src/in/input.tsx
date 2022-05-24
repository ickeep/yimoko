import { observer } from '@formily/reactive-react';
import { Input as TInput, InputProps as TInputProps } from '@tarojs/components';
import classNames from 'classNames';
import { CSSProperties } from 'react';

export interface InputProps extends TInputProps {
  onChange?: (value?: string) => void
  style?: CSSProperties
}

export const Input = observer((props: InputProps) => {
  const { onChange, onInput, className, ...args } = props;

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
