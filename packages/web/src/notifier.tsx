import { INotifier } from '@yimoko/store';
import { notification } from 'antd';

export const notifier: INotifier = (type, msg, options) => {
  if (type in notification) {
    // notification[type]?.({ message: msg, ...options });
  }
};
