import { Slider as TSlider } from '@antmjs/vantui';
import { SliderProps as TSliderProps } from '@antmjs/vantui/types/slider';
import { ITouchEvent } from '@tarojs/components';

export interface SliderProps extends Omit<TSliderProps, 'onChange'> {
  onChange?: (value: any, event: ITouchEvent) => void
}

export const Slider = (props: SliderProps) => {
  const { onChange, ...args } = props;

  return <TSlider {...args} onChange={e => onChange?.(e.detail?.value ?? e.detail, e)} />;
};
