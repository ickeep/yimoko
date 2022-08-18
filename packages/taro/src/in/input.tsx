import { observer } from '@formily/react';
import { Input as TInput, InputProps as TInputProps } from '@tarojs/components';
export interface InputProps extends TInputProps {
  onChange?: (value?: string) => void
}

export const Input = observer((props: InputProps) => {
  const { onChange, onInput, ...args } = props;

  return (
    <TInput
      {...args}
      onInput={(e) => {
        onInput?.(e);
        onChange?.(e.detail.value);
      }}
    />
  );
});
