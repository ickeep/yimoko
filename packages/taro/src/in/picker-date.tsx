import { BaseEventOrig, Picker as TPicker, PickerDateProps as TPickerDateProps } from '@tarojs/components';

import { TextProps } from '../base/text';

import { PickerLabel, PickerWp } from './picker';

export type PickerDateProps = Omit<TextProps, 'value'> & Omit<TPickerDateProps, 'value'> & {
  placeholder?: string;
  onChange?: (value: any, event: BaseEventOrig<TPickerDateProps.ChangeEventDetail>) => void
  value?: any
  clearable?: boolean
};

export const PickerDate = (props: PickerDateProps) => {
  const { onChange, value, clearable, start, end, fields, ...args } = props;

  return (
    <PickerWp onChange={onChange} value={value} clearable={clearable} >
      <TPicker className='y-picker' mode="date" value={value} start={start} end={end} fields={fields} onChange={e => onChange?.(e.detail.value, e)} >
        <PickerLabel {...args} value={value} />
      </TPicker>
    </PickerWp>
  );
};

