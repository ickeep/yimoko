import { observer } from '@formily/react';
import { Button, ButtonProps, Drawer as ADrawer, DrawerProps as ADrawerProps } from 'antd';
import { Key, ReactElement, FC, Component, useState, useMemo, cloneElement, isValidElement, useCallback } from 'react';
import { isValidElementType } from 'react-is';

interface ITriggerProps {
  onClick?: () => void | Promise<void>,
  onOpen?: () => void | Promise<void>,
  [key: Key]: any
}

interface IContentProps {
  onClose: () => void | Promise<void>,
  [key: Key]: any
}

export interface DrawerProps extends Omit<ADrawerProps, 'children'> {
  trigger?: ButtonProps | ReactElement<ITriggerProps> | FC<ITriggerProps> | Component<ITriggerProps>
  content?: ReactElement<IContentProps> | FC<IContentProps> | Component<IContentProps>
  children?: ReactElement<IContentProps>
  onOpen?: () => void | Promise<void>,
  onClose?: () => void | Promise<void>,
}

export const Drawer = observer((props: DrawerProps) => {
  const { trigger, content, onOpen, onClose, children, open, ...args } = props;
  const { title } = args;
  const [isOpen, setOpen] = useState<boolean>();

  const curOpen = useMemo(() => open ?? isOpen, [isOpen, open]);

  const openUp = useCallback(() => {
    onOpen?.();
    setOpen(true);
  }, [onOpen]);

  const close = useCallback(() => {
    onClose?.();
    setOpen(false);
  }, [onClose]);

  const curTrigger = useMemo(() => {
    if (isValidElement(trigger)) {
      return cloneElement(trigger, { onClick: openUp });
    }
    if (isValidElementType(trigger)) {
      const C: any = trigger;
      return <C onClick={openUp} onOpen={openUp} />;
    }
    return <Button children={title} {...trigger} onClick={(e) => {
      openUp();
      if (trigger && 'onClick' in trigger) {
        trigger.onClick?.(e);
      }
    }} />;
  }, [openUp, title, trigger]);

  const curChildren = useMemo(() => {
    if (isValidElement(children)) {
      return cloneElement(children, { onClose: close });
    }
    if (isValidElement(content)) {
      return cloneElement(content, { onClose: close });
    }
    if (isValidElementType(content)) {
      const C: any = content;
      return <C onClose={close} />;
    }
    return null;
  }, [children, close, content]);

  return <>{curTrigger} {curOpen !== undefined && <ADrawer {...args} open={curOpen} onClose={close}>{curChildren}</ADrawer>}</>;
});
