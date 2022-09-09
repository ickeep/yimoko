import { Form } from '@formily/core';

import { IHTTPCode, IHTTPResponse, judgeIsSuccess } from '../tools/api';
import { judgeIsEmpty } from '../tools/tool';

import { BaseStore, IBaseStoreConfig, IStoreValues } from './base';
import { INotifier } from './config';

export const defaultRunAfter: IRunAfter = {
  notify: true,
};

// 操作 store, 请求 API 默认不过滤空值，默认请求结果后，对其进行通知
export class OperateStore<V extends object = IStoreValues, R = IStoreValues> extends BaseStore<V, R> {
  form?: Form<V>;
  notifier?: INotifier;
  scope: Record<string, any> = {};
  runBefore: IRunBefore = {};
  runAfter: IRunAfter = {};
  constructor(config: IOperateStoreConfig<V, R>) {
    const { runBefore, runAfter, form, scope, notifier, ...args } = config;
    super({
      isFilterEmptyAtRun: false,
      ...args,
    });
    scope && (this.scope = scope);
    form && (this.form = form);
    notifier && (this.notifier = notifier);
    this.runAfter = { ...defaultRunAfter, ...runAfter };
    const { runAPI } = this;

    this.runAPI = async () => {
      const { form, runBefore, runAfter } = this;
      if (runBefore.verify) {
        const sub = await form?.submit();
        if (!sub) {
          const res = { code: IHTTPCode.badRequest, msg: '表单校验失败', data: {} };
          handleRunAfter(res, runAfter, this);
          return res;
        }
      }
      const res = await runAPI();
      res && handleRunAfter(res, runAfter, this);
      return res;
    };
  }
}

const handleRunAfter = (res: Partial<IHTTPResponse>, runAfter: IRunAfter, store: OperateStore<any, any>) => {
  handleRunAfterRun(res, runAfter, store);
  handleRunAfterNotify(res, runAfter, store);
};

const handleRunAfterRun = (res: Partial<IHTTPResponse>, runAfter: IRunAfter, store: OperateStore<any, any>) => {
  const { run, runOnFail, runOnSuccess } = runAfter;
  const runFn = (fn: IRunAfter['run']) => typeof fn === 'function' && fn(res, store);
  runFn(run);
  judgeIsSuccess(res) ? runFn(runOnSuccess) : runFn(runOnFail);
};

const handleRunAfterNotify = (res: Partial<IHTTPResponse>, runAfter: IRunAfter, store: OperateStore<any, any>) => {
  const { notify, notifyOnFail = notify, notifyOnSuccess = notify } = runAfter;
  const getMsg = (notify: true | string, df?: string) => {
    const msg = notify === true ? res.msg : notify;
    return judgeIsEmpty(msg) ? df : msg;
  };
  if (judgeIsSuccess(res)) {
    notifyOnSuccess && store.notifier?.('success', getMsg(notifyOnSuccess, '成功了'));
  } else {
    notifyOnFail && store.notifier?.('error', getMsg(notifyOnFail, '出错了'));
  }
};

export interface IOperateStoreConfig<V extends object = IStoreValues, R = IStoreValues> extends IBaseStoreConfig<V, R> {
  notifier?: INotifier;
  form?: Form<V>
  scope?: Record<string, any>;
  runBefore?: IRunBefore;
  runAfter?: IRunAfter
};

export type IRunFn = (res: Partial<IHTTPResponse>, store: OperateStore<any, any>) => void;

export interface IRunBefore {
  verify?: boolean
}

export interface IRunAfter {
  notify?: true | string
  notifyOnFail?: true | string
  notifyOnSuccess?: true | string
  run?: IRunFn
  runOnFail?: IRunFn
  runOnSuccess?: IRunFn
}
