import { observer, useExpressionScope } from '@formily/react';
import { BoxContentProvider, IStore, useBoxStore, BoxContentRender, useBoxContent, useCurForm, judgeIsEmpty } from '@yimoko/store';
import { Modal as AModal, ModalProps as AModalProps } from 'antd';
import { ModalFunc } from 'antd/lib/modal/confirm';
import { Key, ReactElement, FC, Component, useMemo, useEffect, useRef } from 'react';

import { trigStoreRun } from './run-trigger';
import { ITriggerRender, Trigger, TriggerProps } from './trigger';

interface IContentProps {
  isBoxContent?: boolean
  onClose: () => void | Promise<void>,
  [key: Key]: any
}

export interface ModalProps extends Omit<AModalProps, 'children'> {
  trigger?: ITriggerRender
  trigEvent?: TriggerProps['trigEvent']
  content?: ReactElement<IContentProps> | FC<IContentProps> | Component<IContentProps>
  children?: ReactElement<IContentProps>
  onOpen?: () => void | Promise<void>,
  onClose?: () => void | Promise<void>,
  isBindStore?: boolean
  isBindContent?: boolean
  store?: IStore
  closeBox?: boolean | 'success' | 'fail'
  type?: 'info' | 'success' | 'error' | 'warning' | 'confirm'
}

export const Modal = observer((props: ModalProps) => {
  const { trigger, trigEvent, onOpen, onClose, open, ...args } = props;
  const { title } = args;

  const boxStore = useBoxStore({ isOpen: open, onClose, onOpen });
  const { isOpen, openUp } = boxStore;
  const scope = useExpressionScope();
  console.log('props.title', props.title);
  console.log('record', scope.$record.name);

  return (
    <BoxContentProvider value={boxStore}>
      <Trigger children={title} render={trigger} trigEvent={trigEvent} onTrig={openUp} />
      {isOpen !== undefined && <ModalRender {...args} open={isOpen} />}
    </BoxContentProvider>
  );
});

const ModalRender = observer((props: Omit<ModalProps, 'trigger' | 'onOpen' | 'onClose'>) => {
  const { content, children, isBindStore, store, onOk, onCancel, okButtonProps, closeBox = 'success', isBindContent, ...args } = props;
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
    <ModalTypeRender
      {...args}
      okButtonProps={{ loading: curStore?.loading, disabled: !judgeIsEmpty(curForm?.errors), ...okButtonProps }}
      onOk={ok}
      onCancel={cancel}
    >
      <BoxContentRender isBind={isBindContent} content={content}>{children}</BoxContentRender>
    </ModalTypeRender>
  );
});

const ModalTypeRender = observer((props: AModalProps & { type?: ModalProps['type'] }) => {
  const { type, ...args } = props;
  if (!type) {
    return <AModal {...args} />;
  }
  return <ModalFnRender {...args} type={type} />;
});

const ModalFnRender = observer((props: AModalProps & { type: Required<ModalProps>['type'] }) => {
  const [modal, contextHolder] = AModal.useModal();
  const { type, open, children, ...args } = props;
  const refModal = useRef<ReturnType<ModalFunc>>();

  useEffect(() => {
    const m = refModal.current;
    m && open && m.update({ ...args, content: children });
  }, [args, children, open]);

  useEffect(() => {
    if (open) {
      refModal.current = modal[type]?.({ ...args, content: children });
    } else {
      refModal.current?.destroy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, open, type]);

  return <>{contextHolder}</>;
});

