import { observer } from '@formily/react';
import { useBoxContent } from '@yimoko/store';
import { ButtonProps } from 'antd';

import { ITriggerRender, Trigger, TriggerProps } from './trigger';

export interface OkTriggerProps extends ButtonProps {
  trigger?: ITriggerRender
  closeBox?: boolean
  onOk: TriggerProps['onTrig']
}

export const OkTrigger = observer((props: OkTriggerProps) => {
  const { closeBox = true, onOk, ...args } = props;
  const { onClose } = useBoxContent();

  return (
    <Trigger
      children="确定"
      type='primary'
      {...args}
      onTrig={(e) => {
        onOk?.(e);
        closeBox && onClose?.();
      }}
    />
  );
});
