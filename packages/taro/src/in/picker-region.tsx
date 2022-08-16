import { BaseEventOrig, Picker as TPicker, PickerRegionProps as TPickerRegionProps } from '@tarojs/components';
import { IOptionsAPIProps, useAPIOptions, judgeIsEmpty, strToArr } from '@yimoko/store';
import { useMemo } from 'react';

import { TextProps } from '../base/text';

import { PickerLabel, PickerWp } from './picker';

const defaultKeys = {
  value: 'value',
  label: 'label',
  postcode: 'postcode',
};

// eslint-disable-next-line max-len
export type PickerRegionProps = Omit<TextProps, 'value'> & Omit<TPickerRegionProps, 'value' | 'onChange' | 'regionData'> & IOptionsAPIProps<keyof typeof defaultKeys> &
{
  placeholder?: string;
  onChange?: (value: any, event: BaseEventOrig<TPickerRegionProps.ChangeEventDetail>) => void
  value?: any
  clearable?: boolean
  valueType?: 'string' | 'array'
  valueSplitter?: string
};

export const PickerRegion = (props: PickerRegionProps) => {
  const { options, api, keys, splitter, onChange, value, clearable, customItem, valueType, valueSplitter = '/', ...args } = props;
  const curKeys = useMemo(() => {
    const { value, label, ...args } = { ...defaultKeys, ...keys };
    return { value: label, code: value, ...args };
  }, [keys]);

  const curValue = useMemo(() => (Array.isArray(value) ? value : strToArr(value, valueSplitter)), [value, valueSplitter]);
  const [data] = useAPIOptions(options, api, curKeys, splitter);

  return (
    <PickerWp onChange={onChange} value={curValue} clearable={clearable} >
      <TPicker
        className='y-picker'
        mode="region"
        value={curValue}
        customItem={customItem}
        regionData={judgeIsEmpty(data) ? undefined : data}
        onChange={(e) => {
          const { value } = e.detail;
          if (valueType === 'array') {
            onChange?.(value, e);
          }
          return onChange?.(value.join(valueSplitter), e);
        }} >
        <PickerLabel {...args} value={value} />
      </TPicker>
    </PickerWp>
  );
};

