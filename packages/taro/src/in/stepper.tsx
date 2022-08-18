import { Stepper as TStepper } from '@antmjs/vantui';
import { StepperProps as TStepperProps } from '@antmjs/vantui/types/stepper';

export interface StepperProps extends Omit<TStepperProps, 'onChange'> {
  onChange?: (value: string | number) => void
}

export const Stepper = (props: StepperProps) => {
  const { onChange, ...args } = props;

  return <TStepper {...args} onChange={e => onChange?.(e.detail)} />;
};
