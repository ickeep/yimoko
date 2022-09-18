import { INotifier, judgeValidKey } from '@yimoko/store';
import { notification, message, Modal } from 'antd';

const titleMap = {
  success: '成功',
  error: '错误',
  info: '提示',
  warning: '警告',
  warn: '警告',
  confirm: '确认',
  loading: '加载',
};

// eslint-disable-next-line complexity
export const notifier: INotifier = (type, msg, options) => {
  if (type === 'close') {
    notification.close(msg ?? options?.key);
    return;
  }
  if (type === 'config') {
    options && notification.config(options);
    return;
  }
  if (judgeValidKey(type, notification)) {
    const fn = notification[type] as Function;
    if (typeof fn === 'function') {
      fn({ message: titleMap[type], ...options, description: msg || options?.description });
    };
  }
};

// eslint-disable-next-line complexity
export const messageNotifier: INotifier = (type, msg, options) => {
  if (type === 'config') {
    options && message.config(options);
    return;
  }
  if (judgeValidKey(type, message)) {
    const fn = message[type] as Function;
    if (typeof fn === 'function') {
      fn({ ...options, content: msg || options?.message });
    };
  }
};

// eslint-disable-next-line complexity
export const modalNotifier: INotifier = (type, msg, options) => {
  if (judgeValidKey(type, Modal)) {
    const fn = Modal[type] as Function;
    if (typeof fn === 'function') {
      const title = options?.title ?? titleMap[type];
      fn({ ...options, title, content: msg || options?.message });
    }
  };
};


