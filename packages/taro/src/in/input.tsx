import { observer } from '@formily/reactive-react';
import { Input as TInput, InputProps as TInputProps } from '@tarojs/components';
import classNames from 'classNames';

import { Text } from '../out/text';
import { ISize } from '../props';

import { useFormInherit } from './form';

export interface InputProps extends TInputProps {
  size?: ISize
  onChange?: (value?: string) => void
  readOnly?: boolean
}

export const Input = observer((props: InputProps) => {
  const formProps = useFormInherit();
  const { onChange, onInput, size, className, readOnly, ...args } = props;
  const iSize = size ?? formProps.size;

  console.log('isize', iSize);

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
