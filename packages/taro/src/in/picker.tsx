import { Icon } from '@antmjs/vantui';
import { BaseEventOrig, Picker as TPicker, PickerSelectorProps, TextProps, View } from '@tarojs/components';

import { IOptionsAPIProps, judgeIsEmpty, useAPIOptions } from '@yimoko/store';
import cls from 'classnames';
import { ReactNode, useMemo } from 'react';

import { Text } from '../base/text';

export type PickerProps = Omit<TextProps, 'value'> & IOptionsAPIProps & {
  clearable?: boolean
  placeholder?: string;
  onChange?: (value: any, event: BaseEventOrig<PickerSelectorProps.ChangeEventDetail>) => void
  value?: any
};

export const Picker = (props: PickerProps) => {
  const { options, api, keys, splitter, onChange, value, clearable, ...args } = props;
  const [data] = useAPIOptions(options, api, keys, splitter);

  const curIndex = useMemo(() => data.findIndex(item => item.value === value), [data, value]);
  const curLabel = useMemo(() => data.find(item => item.value === value)?.label, [data, value]);

  return (
    <PickerWp onChange={onChange} value={curIndex} clearable={clearable} >
      <TPicker className='y-picker' rangeKey="label" value={curIndex} range={data} onChange={(e) => {
        // @ts-ignore
        const item = data[e.detail.value];
        onChange?.(item.value, e);
      }} ><PickerLabel {...args} value={curLabel} /></TPicker>
    </PickerWp>
  );
};

export interface PickerLabelProps extends TextProps {
  placeholder?: string
  value?: any
}

export const PickerLabel = (props: PickerLabelProps) => {
  const { placeholder, value, className, ...args } = props;

  if (judgeIsEmpty(value)) {
    return <Text {...args} className={cls('y-picker-label', 'y-picker-placeholder', className)}>{placeholder}</Text>;
  }
  return <Text {...args} className={cls('y-picker-label', className)}>{value}</Text>;
};


export interface PickerWpBaseProps {
  value?: any
  onChange?: (...args: any[]) => void
  clearable?: boolean
  children: ReactNode
}
export function PickerWp<T extends object = Record<string, any>>(props: T & PickerWpBaseProps) {
  const { value, onChange, clearable, children } = props;

  if (clearable && !judgeIsEmpty(value)) {
    return (
      <View className='y-picker-wp'>
        {children}
        <Icon className='y-picker-clear van-field__clear-root' name='clear' onClick={e => onChange?.(undefined, e)} />
      </View>);
  }
  return <>{children}</>;
}
