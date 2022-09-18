import { observer } from '@formily/react';
import { useBox } from '@yimoko/store';
import { ButtonProps } from 'antd';

import { ITriggerRender, Trigger, TriggerProps } from './trigger';

export interface CancelTriggerProps extends ButtonProps {
  trigger?: ITriggerRender
  closeBox?: boolean
  onCancel: TriggerProps['onTrig']
}

export const CancelTrigger = observer((props: CancelTriggerProps) => {
  const { closeBox = true, onCancel, ...args } = props;
  const { onClose } = useBox();

  return (
    <Trigger
      children="取消"
      {...args}
      onTrig={(e) => {
        onCancel?.(e);
        closeBox && onClose?.();
      }}
    />
  );
});
