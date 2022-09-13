import { observer } from '@formily/react';
import { IStoreResponse, judgeIsSuccess } from '@yimoko/store';
import { Result, ResultProps, Button, Spin } from 'antd';
import { useMemo } from 'react';

import { Icon } from '../out/icon';

import { Link } from './link';

export interface PageErrorProps extends Omit<ResultProps, 'icon'> {
  isReturnIndex?: boolean
  loading?: boolean;
  response: IStoreResponse<any, any>;
  onAgain?: () => any | Promise<any>;
  icon?: string
  children?: React.ReactNode
}

export const PageError = observer((props: PageErrorProps) => {
  const { isReturnIndex = true, loading, response, onAgain, icon, status, children, ...args } = props;
  const isSuccess = judgeIsSuccess(response);
  const { msg, code } = response;

  const isErr = useMemo(() => ((!loading || (loading && code))) && !isSuccess && code, [loading, isSuccess, code]);
  const curIcon = useMemo(() => (icon ? <Icon name={icon} /> : undefined), [icon]);
  const curStatus: any = useMemo(() => {
    if (status) {
      return status;
    }
    if (curIcon) {
      return undefined;
    }
    return code && [403, 404, 500].includes(code) ? code : 'error';
  }, [code, curIcon, status]);

  if (!isErr) {
    return null;
  }

  return (
    <Spin spinning={loading}>
      <Result
        {...args}
        icon={curIcon}
        status={curStatus}
        title={`出错了 ${code ?? ''}`}
        subTitle={msg}
        extra={<>
          {isReturnIndex && <Link to='/'><Button >返回首页</Button></Link>}
          {onAgain && <Button type='primary' onClick={onAgain}>再试一次</Button>}
        </>}
      >{children}</Result>
    </Spin>
  );
});
