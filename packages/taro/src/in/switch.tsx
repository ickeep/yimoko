import { Switch as TSwitch } from '@antmjs/vantui';
import { SwitchProps as TSwitchProps } from '@antmjs/vantui/types/switch';
import { ITouchEvent } from '@tarojs/components';
import { useMemo } from 'react';

export interface SwitchProps extends Omit<TSwitchProps, 'onChange' | 'checked'> {
  onChange?: (value: any, event: ITouchEvent) => void
  values?: { true: any, false: any }
  value?: any
}

export const Switch = (props: SwitchProps) => {
  const { onChange, value, values, ...args } = props;

  const curValue = useMemo(() => {
    if (value === undefined) {
      return undefined;
    }
    if (values) {
      return value === values.true;
    }
    return !!value;
  }, [value, values]);

  return (
    <TSwitch
      size='medium'
      {...args}
      checked={curValue}
      onChange={(e) => {
        const { detail } = e;
        let val = detail;
        if (values) {
          val = detail ? values.true : values.false;
        }
        onChange?.(val, e);
      }} />
  );
};
