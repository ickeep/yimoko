import { observer, useExpressionScope } from '@formily/react';
import { IStore, judgeIsEmpty, judgeIsSuccess } from '@yimoko/store';
import { Skeleton, SkeletonProps, Spin, SpinProps } from 'antd';
import { useMemo } from 'react';

import { PageError } from '../out/page-error';

export interface StorePageContentProps {
  store?: IStore,
  children?: React.ReactNode
  skeleton?: SkeletonProps | false
  isReturnIndex?: boolean
  isAgain?: boolean
  spin?: Omit<SpinProps, 'spinning'> | boolean
}

export const StorePageContent = observer((props: StorePageContentProps) => {
  const { store, children, skeleton, isReturnIndex, isAgain = true, spin = false } = props;
  const scope = useExpressionScope();

  const curStore = useMemo(() => store ?? (scope?.curStore as IStore), [store, scope?.curStore]);

  const { loading, response, runAPI } = curStore ?? {};

  const curOnAgain = useMemo(() => (isAgain ? runAPI : undefined), [isAgain, runAPI]);
  const isSkeleton = useMemo(() => loading && judgeIsEmpty(response) && skeleton !== false, [loading, response, skeleton]);
  const curChildren = useMemo(
    () => (spin
      ? <Spin {...(typeof spin === 'object' ? spin : {})} spinning={loading}>{children}</Spin>
      : children)
    , [spin, loading, children],
  );

  if (!curStore || judgeIsSuccess(response)) {
    return <>{curChildren}</>;
  }

  if (isSkeleton) {
    return <Skeleton paragraph={{ rows: 6 }} active {...skeleton} />;
  }

  return <PageError response={response} isReturnIndex={isReturnIndex} onAgain={curOnAgain} loading={loading} />;
});
