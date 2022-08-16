import { BaseEventOrig, Picker as TPicker, PickerTimeProps as TPickerTimeProps } from '@tarojs/components';

import { TextProps } from '../base/text';

import { PickerLabel, PickerWp } from './picker';

export type PickerTimeProps = Omit<TextProps, 'value'> & Omit<TPickerTimeProps, 'value'> & {
  placeholder?: string;
  onChange?: (value: any, event: BaseEventOrig<TPickerTimeProps.ChangeEventDetail>) => void
  value?: any
  clearable?: boolean
};

export const PickerTime = (props: PickerTimeProps) => {
  const { onChange, value, clearable, start, end, ...args } = props;

  return (
    <PickerWp onChange={onChange} value={value} clearable={clearable} >
      <TPicker className='y-picker' mode="time" value={value} start={start} end={end} onChange={e => onChange?.(e.detail.value, e)} >
        <PickerLabel {...args} value={value} />
      </TPicker>
    </PickerWp>
  );
};

