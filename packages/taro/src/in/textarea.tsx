import { observer } from '@formily/react';
import { Textarea as TTextarea, TextareaProps as TTextareaProps } from '@tarojs/components';
export interface TextareaProps extends TTextareaProps {
  onChange?: (value?: string) => void
}

export const Textarea = observer((props: TextareaProps) => {
  const { onChange, onInput, ...args } = props;

  return (
    <TTextarea
      {...args}
      onInput={(e) => {
        onInput?.(e);
        onChange?.(e.detail.value);
      }}
    />
  );
});
