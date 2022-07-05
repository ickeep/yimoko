import { observer } from '@formily/react';
import { View } from '@tarojs/components';
import React from 'react';

export interface PopoverProps {
  children: React.ReactNode,
  content: React.ReactNode,
}
// todo
export const Popover = observer((props: PopoverProps) => {
  const { children } = props;

  return (
    <View>{children}</View>
  );
});
