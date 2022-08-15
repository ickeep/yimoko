// antmjs 的 DatetimePicker 二次引用会出错，所以暂时不引用
import { DatetimePicker as TDatetimePicker } from '@antmjs/vantui';
import { DatetimePickerEventsByValue, DatetimePickerProps as TDatetimePickerProps } from '@antmjs/vantui/types/datetime-picker';
import { observer } from '@formily/react';
import day from 'dayjs';
import { useMemo } from 'react';

export type DatetimePickerProps = Omit<TDatetimePickerProps, 'onChange'> & {
  timestamp: 'ms' | 's'
  format?: string;
  onChange?: (value: any, event: DatetimePickerEventsByValue) => void
  value?: any
};

const formatMap = {
  date: 'YYYY-MM-DD',
  time: 'HH:mm:ss',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  'year-month': 'YYYY-MM',
};

// todo 待 antm 修复 bug
export const DatetimePicker = observer((props: DatetimePickerProps) => {
  const { onChange, value, timestamp, type = 'date', onInput, format, ...args } = props;

  const curFormat = useMemo(() => ((format) ? format : formatMap[type]), [format, type]);

  const curValue = useMemo(() => {
    const curDay = timestamp === 's' ? day.unix(value) : day(value, curFormat);
    if (curDay.isValid()) {
      return curDay.valueOf();
    }
    return day().valueOf();
  }, [timestamp, value, curFormat]);

  console.log('curValue', curValue);


  return (
    <TDatetimePicker
      showToolbar={false}
      {...args}
      type={type}
      value={curValue}
    // onInput={(e) => {
    //   onInput?.(e);
    //   const { detail } = e;
    //   // @ts-ignore  antm 样式定义出错
    //   const valDay = day(detail);
    //   if (timestamp === 's') {
    //     onChange?.(valDay.unix(), e);
    //   }
    //   if (timestamp === 'ms') {
    //     onChange?.(valDay.valueOf(), e);
    //   }
    //   onChange?.(valDay.format(curFormat), e);
    // }}
    />
  );
});


