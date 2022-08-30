import { observer, useExpressionScope, useForm } from '@formily/react';
import { Form as TForm, FormProps as TFormProps } from '@tarojs/components';
import { IHTTPResponse, IStore, judgeIsSuccess } from '@yimoko/store';

import { IRouteType, route } from '../adapter/route';
import { showToast } from '../adapter/toast';

export interface IRunRule {
  type?: IRouteType | string,
  url?: string | number,
}

export type IRunFn = (store: IStore, scope?: Record<string, any>) => void;

export interface FormProps extends TFormProps {
  notifyOnFail?: true | string
  notifyOnSuccess?: true | string
  runOnFail?: IRunRule | IRunFn
  runOnSuccess?: IRunRule | IRunFn
}

export const Form = observer((props: FormProps) => {
  const { onSubmit, notifyOnSuccess, notifyOnFail, runOnFail, runOnSuccess, ...args } = props;
  const form = useForm();
  const scope = useExpressionScope();
  const curStore = scope?.curStore as IStore | undefined;
  return (
    <TForm {...args} onSubmit={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onSubmit?.(e);
      form?.submit(() => {
        curStore?.runAPI().then((res) => {
          if (judgeIsSuccess(res)) {
            successNotify(notifyOnSuccess, res);
            runOnSuccess && runRule(runOnSuccess, curStore, scope);
          } else {
            failNotify(notifyOnFail, res);
            runOnFail && runRule(runOnFail, curStore, scope);
          }
        });
      });
    }} />
  );
});


const runRoute = (runConf: IRunRule) => {
  const { type, url } = runConf;
  const fnKey = (type ?? (url ? 'to' : undefined)) as IRouteType;
  // @ts-ignore
  fnKey && route[fnKey]?.(url);
};

// 目前暂时只支持路由跳转，后续可以支持其他操作
const runRule = (runConf: IRunRule | IRunFn, store: IStore, scope?: Record<string, any>) => {
  if (typeof runConf === 'function') {
    return runConf(store, scope);
  }
  runRoute(runConf);
  return;
};

const successNotify = (notifyOnSuccess?: true | string, res?: Partial<IHTTPResponse>) => {
  if (!notifyOnSuccess || !res) {
    return null;
  }
  const { msg = '成功' } = res;
  const title = notifyOnSuccess === true ? msg : notifyOnSuccess;
  return showToast({ title, icon: 'success' });
};

const failNotify = (notifyOnFail?: true | string, res?: Partial<IHTTPResponse>) => {
  if (!notifyOnFail || !res) {
    return null;
  }
  const { msg = '失败' } = res;
  const title = notifyOnFail === true ? msg : notifyOnFail;
  return showToast({ title, icon: 'error' });
};
