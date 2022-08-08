import { Rate as TRate } from '@antmjs/vantui';
import { RateProps as TRateProps } from '@antmjs/vantui/types/rate';
import { ITouchEvent } from '@tarojs/components';

export interface RateProps extends Omit<TRateProps, 'onChange'> {
  onChange?: (value: any, event: ITouchEvent) => void
}

export const Rate = (props: RateProps) => {
  const { onChange, ...args } = props;
  return <TRate {...args} onChange={e => onChange?.(e.detail, e)} />;
};
