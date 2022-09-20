import { Button, ButtonProps } from 'antd';
import { cloneElement, Component, FC, isValidElement, Key, ReactElement } from 'react';
import { isValidElementType } from 'react-is';

interface ITriggerProps {
  onTrig?: (...args: any) => any | Promise<any>,
  [key: Key]: any
}

export type ITriggerRender = ButtonProps | ReactElement<ITriggerProps> | FC<ITriggerProps> | Component<ITriggerProps>;

export interface TriggerProps extends ButtonProps {
  render?: ITriggerRender
  onTrig?: (...args: any) => any | Promise<any>,
  trigEvent?: 'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'onFocus' | 'onBlur' | string
  [key: Key]: any
}

export const Trigger = (props: TriggerProps) => {
  const { render, onTrig, trigEvent = 'onClick', ...args } = props;

  const eventProps = {
    [trigEvent]: (...rest: any) => {
      onTrig?.(...rest);
      const event = args?.[trigEvent];
      typeof event === 'function' && event(...rest);
    },
  };

  if (isValidElement(render)) {
    return cloneElement(render, { ...eventProps });
  }

  if (isValidElementType(render)) {
    const C: any = render;
    return <C {...args} {...eventProps} />;
  }

  return <Button {...args}  {...render} {...eventProps} />;
};
