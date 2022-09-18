import { observer } from '@formily/react';
import { BoxContentProvider, IStore, useBoxStore, BoxContentRender, useBoxContent, useCurForm, judgeIsEmpty } from '@yimoko/store';
import { Modal as AModal, ModalProps as AModalProps } from 'antd';
import { Key, ReactElement, FC, Component, useMemo } from 'react';

import { trigStoreRun } from './run-trigger';
import { ITriggerRender, Trigger } from './trigger';

interface IContentProps {
  isBoxContent?: boolean
  onClose: () => void | Promise<void>,
  [key: Key]: any
}

export interface ModalProps extends Omit<AModalProps, 'children' | 'footer'> {
  trigger?: ITriggerRender
  content?: ReactElement<IContentProps> | FC<IContentProps> | Component<IContentProps>
  children?: ReactElement<IContentProps>
  onOpen?: () => void | Promise<void>,
  onClose?: () => void | Promise<void>,
  isBindStore?: boolean
  store?: IStore
  closeBox?: boolean | 'success' | 'fail'
}

export const Modal = observer((props: ModalProps) => {
  const { trigger, onOpen, onClose, open, ...args } = props;
  const { title } = args;

  const boxStore = useBoxStore({ isOpen: open, onClose, onOpen });
  const { isOpen, openUp } = boxStore;

  return (
    <BoxContentProvider value={boxStore}>
      <Trigger children={title} render={trigger} onTrig={openUp} />
      {isOpen !== undefined && <ModalRender {...args} open={isOpen} />}
    </BoxContentProvider>
  );
});

const ModalRender = observer((props: Omit<ModalProps, 'trigger' | 'onOpen' | 'onClose'>) => {
  const { content, children, isBindStore, store, onOk, onCancel, okButtonProps, closeBox = 'success', ...args } = props;
  const boxStore = useBoxContent();
  const { close, contentStore } = boxStore;

  const curStore = store ?? contentStore;
  const curForm = useCurForm(undefined, curStore);

  const isBind = useMemo(() => isBindStore ?? !!store, [isBindStore, store]);

  const ok: ModalProps['onOk'] = (e) => {
    onOk?.(e);
    if (!isBind) {
      close();
    } else {
      trigStoreRun(curStore, boxStore, closeBox);
    }
  };

  const cancel: ModalProps['onCancel'] = (e) => {
    onCancel?.(e);
    close();
  };

  return (
    <AModal
      {...args}
      okButtonProps={{ loading: curStore?.loading, disabled: !judgeIsEmpty(curForm?.errors), ...okButtonProps }}
      onOk={ok}
      onCancel={cancel}
    >
      <BoxContentRender content={content}>{children}</BoxContentRender>
    </AModal>
  );
});

