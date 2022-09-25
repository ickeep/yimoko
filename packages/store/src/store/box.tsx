/* eslint-disable no-param-reassign */
import { action, define, observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';
import { cloneElement, Component, createContext, FC, isValidElement, Key, ReactElement, useContext, useEffect, useState } from 'react';
import { isValidElementType } from 'react-is';

import { useCurStore } from '../hooks/use-cur-store';
import { useDeepEffect } from '../hooks/use-deep-effect';

import { IStore } from '.';

// 管理弹出内容的状态 使用 store 管理 可以减少消费者的渲染
export class BoxStore {
  isOpen?: boolean;
  onOpen?: () => void | Promise<void>;
  onClose?: () => void | Promise<void>;
  contentStore?: IStore;

  constructor(config: Partial<Pick<BoxStore, 'isOpen' | 'onOpen' | 'onClose'>> = {}) {
    setBoxConfig(this, config);
    define(this, {
      isOpen: observable,
      contentStore: observable,
      setOpen: action,
      openUp: action,
      close: action,
      setContentStore: action,
    });
  }

  setOpen = (isOpen: boolean) => {
    isOpen ? this.onOpen?.() : this.onClose?.();
    this.isOpen = isOpen;
  };

  setContentStore = (contentStore: IStore) => {
    this.contentStore = contentStore;
  };

  openUp = () => this.setOpen(true);

  close = () => this.setOpen(false);
}

export const setBoxConfig = (box: BoxStore, config: Partial<Pick<BoxStore, 'isOpen' | 'onOpen' | 'onClose'>>) => {
  const { isOpen, onOpen, onClose } = config;
  isOpen !== undefined && (box.isOpen = isOpen);
  box.onOpen = onOpen;
  box.onClose = onClose;
};

export const useBoxStore = (config: Partial<Pick<BoxStore, 'isOpen' | 'onOpen' | 'onClose'>> = {}) => {
  const [store] = useState(() => new BoxStore(config));

  useDeepEffect(() => {
    setBoxConfig(store, config);
  }, [config, store]);

  return store;
};

export const useBoxBindContentStore = (store: IStore, isBind?: boolean) => {
  const boxStore = useBoxContent();
  const contentStore = useCurStore(store);

  useEffect(() => {
    if (isBind && contentStore && boxStore !== defaultStore) {
      boxStore.setContentStore(contentStore);
    }
  }, [boxStore, contentStore, isBind]);
};

const defaultStore = new BoxStore();

const BoxContent = createContext<BoxStore>(defaultStore);

export const BoxContentProvider = BoxContent.Provider;
export const BoxContentConsumer = BoxContent.Consumer;

export const useBoxContent = () => useContext(BoxContent);


interface IContentProps {
  isBoxContent?: boolean
  onClose: () => void | Promise<void>,
  [key: Key]: any
}
export interface BoxContentRenderProps {
  isBind?: boolean,
  content?: ReactElement<IContentProps> | FC<IContentProps> | Component<IContentProps>
  children?: ReactElement<IContentProps>
}

// eslint-disable-next-line complexity
export const BoxContentRender = observer((props: BoxContentRenderProps) => {
  const { content, isBind = true, children } = props;
  const { close } = useBoxContent();
  const bindProps = isBind ? { onClose: close, isBoxContent: true } : {};
  if (isValidElement(children)) {
    return isBind ? cloneElement(children, bindProps) : children;
  }
  if (isValidElement(content)) {
    return isBind ? cloneElement(content, bindProps) : content;
  }
  if (isValidElementType(content)) {
    const C: any = content;
    return <C {...bindProps} />;
  }
  return null;
});


export interface BoxComponentProps<D extends object = any, T = any> {
  data?: D
  trigger?: T
  onSuccess?: (...rest: any) => any
  onFail?: (...rest: any) => any
  onClose?: (...rest: any) => any
  onOpen?: (...rest: any) => any
}
