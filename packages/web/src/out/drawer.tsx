import { observer } from '@formily/react';
import { BoxContentProvider, IStore, useBox, useBoxStore } from '@yimoko/store';
import { Drawer as ADrawer, DrawerProps as ADrawerProps, Row, Space } from 'antd';
import { Key, ReactElement, FC, Component, useMemo, cloneElement, isValidElement, ReactNode } from 'react';
import { isValidElementType } from 'react-is';

import { CancelTrigger } from './cancel-trigger';
import { OkTrigger } from './ok-trigger';
import { RunTrigger } from './run-trigger';

import { ITriggerRender, Trigger } from './trigger';

interface IContentProps {
  isBoxContent?: boolean
  onClose: () => void | Promise<void>,
  [key: Key]: any
}

export interface DrawerProps extends Omit<ADrawerProps, 'children' | 'footer'> {
  trigger?: ITriggerRender
  content?: ReactElement<IContentProps> | FC<IContentProps> | Component<IContentProps>
  children?: ReactElement<IContentProps>
  onOpen?: () => void | Promise<void>,
  onClose?: () => void | Promise<void>,
  isBindStore?: boolean
  store?: IStore
  footer?: ReactNode | true
}

export const Drawer = observer((props: DrawerProps) => {
  const { trigger, onOpen, onClose, open, ...args } = props;
  const { title } = args;

  const boxStore = useBoxStore({ isOpen: open, onClose, onOpen });
  const { isOpen, openUp } = boxStore;

  return (
    <BoxContentProvider value={boxStore}>
      <Trigger children={title} render={trigger} onTrig={openUp} />
      <DrawerContent {...args} open={isOpen} />
    </BoxContentProvider>
  );
});


const DrawerContent = observer((props: DrawerProps) => {
  const { trigger, content, onOpen, onClose, children, open, isBindStore, store, footer, ...args } = props;
  const { isOpen, close } = useBox();

  if (open === undefined) {
    return null;
  }

  const isBind = useMemo(() => isBindStore ?? !!store, [isBindStore, store]);

  const curFooter = useMemo(() => {
    if (footer === true) {
      return (
        <Row justify="end">
          <Space>
            <CancelTrigger onCancel={close} />
            {isBind ? <RunTrigger isBoxContent store={store} /> : <OkTrigger onOk={close} />}
          </Space>
        </Row>
      );
    }
    return footer;
  }, [close, footer, isBind, store]);

  const curChildren = useMemo(() => {
    if (isValidElement(children)) {
      return cloneElement(children, { onClose: close, isBoxContent: true });
    }
    if (isValidElement(content)) {
      return cloneElement(content, { onClose: close, isBoxContent: true });
    }
    if (isValidElementType(content)) {
      const C: any = content;
      return <C onClose={close} />;
    }
    return null;
  }, [children, close, content]);

  return (
    <ADrawer {...args} footer={curFooter} open={isOpen} onClose={close}>
      {curChildren}
    </ADrawer>
  );
});
