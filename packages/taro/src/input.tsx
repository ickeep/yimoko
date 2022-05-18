import { connect, mapProps } from '@formily/react';
import { Input as TInput, InputProps } from '@tarojs/components';

export const Input = connect(TInput, mapProps((props: any) => ({
  ...props,
  onInput: e => props.onChange?.(e.detail.value),
})));

export type IInputProps = InputProps;
