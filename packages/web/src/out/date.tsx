import { valToDate } from '@yimoko/store';

export interface OutDateProps {
  value?: string | number | Date,
  format?: string,
  timestamp?: 'ms' | 's',
  valFormat?: string,
}
export const DateOut = (props: OutDateProps) => {
  const { value = '', valFormat = '', timestamp, format = 'YYYY-MM-DD HH:mm:ss' } = props;
  const date = valToDate(value, valFormat, timestamp);
  return <>{(!date || isNaN(date.valueOf())) ? '' : date.format(format)}</>;
};
