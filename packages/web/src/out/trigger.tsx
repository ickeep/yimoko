import { Button, ButtonProps } from 'antd';
import { cloneElement, Component, FC, isValidElement, Key, ReactElement } from 'react';
import { isValidElementType } from 'react-is';

interface ITriggerProps {
  onTrig?: ButtonProps['onClick'] | (() => void | Promise<void>),
  [key: Key]: any
}

export type ITriggerRender = ButtonProps | ReactElement<ITriggerProps> | FC<ITriggerProps> | Component<ITriggerProps>;

export interface TriggerProps extends ButtonProps {
  render?: ITriggerRender
  onTrig?: ButtonProps['onClick'] | (() => void | Promise<void>),
}

export const Trigger = (props: TriggerProps) => {
  const { render, onTrig, ...args } = props;
  const { onClick } = args;

  if (isValidElement(render)) {
    return cloneElement(render, { ...args, onTrig });
  }

  if (isValidElementType(render)) {
    const C: any = render;
    return <C {...args} oonTrig={onTrig} />;
  }

  return (
    <Button
      {...render}
      {...args}
      onClick={(e) => {
        onTrig?.(e);
        onClick?.(e);
      }}
    />
  );
};
