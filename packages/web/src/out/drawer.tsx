import { observer } from '@formily/react';
import { BoxContentProvider, BoxContentRender, IStore, useBoxContent, useBoxStore } from '@yimoko/store';
import { ButtonProps, Drawer as ADrawer, DrawerProps as ADrawerProps, Row, RowProps, Space } from 'antd';
import { Key, ReactElement, FC, Component, useMemo, ReactNode } from 'react';

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
  okButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  footerRowProps?: RowProps
}

export const Drawer = observer((props: DrawerProps) => {
  const { trigger, onOpen, onClose, open, ...args } = props;
  const { title } = args;

  const boxStore = useBoxStore({ isOpen: open, onClose, onOpen });
  const { isOpen, openUp, close } = boxStore;

  return (
    <BoxContentProvider value={boxStore}>
      <Trigger children={title} render={trigger} onTrig={openUp} />
      {isOpen !== undefined && (
        <DrawerRender {...args} open={isOpen} onClose={close} />
      )}
    </BoxContentProvider>
  );
});

const DrawerRender = observer((props: Omit<DrawerProps, 'trigger' | 'onOpen'>) => {
  const { content, children, isBindStore, store, footer, okButtonProps, cancelButtonProps, footerRowProps, ...args } = props;
  const boxStore = useBoxContent();
  const { close } = boxStore;

  const isBind = useMemo(() => isBindStore ?? !!store, [isBindStore, store]);

  const curFooter = useMemo(() => {
    if (footer === true) {
      return (
        <Row justify="end" {...footerRowProps}>
          {isBind
            ? <Space>
              <CancelTrigger {...cancelButtonProps} onCancel={close} />
              <RunTrigger {...okButtonProps} store={store} isBoxContent />
            </Space>
            : <OkTrigger children="知道了" {...okButtonProps} onOk={close} />}
        </Row>
      );
    }
    return footer;
  }, [cancelButtonProps, close, footer, footerRowProps, isBind, okButtonProps, store]);

  return (
    <ADrawer {...args} footer={curFooter} onClose={close}>
      <BoxContentRender content={content}>{children}</BoxContentRender>
    </ADrawer>
  );
});
