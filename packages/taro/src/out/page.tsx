import { observer } from '@formily/reactive-react';
import classNames from 'classnames';
import { IStoreResponse } from 'packages/store/types';
import React from 'react';

import { judgeIsSuccess } from '../adapter/http';

import { Loading } from './loading';
import { ResponseError } from './response-error';
import { View, ViewProps } from './view';

export interface PageProps<T extends IStoreResponse<any, any> = IStoreResponse<any, any>> extends ViewProps {
  loading?: boolean
  data: T
}

type IPage<T extends IStoreResponse<any, any> = IStoreResponse<any, any>> = React.FC<PageProps<T>>;

export const Page: IPage = observer((props) => {
  const { loading, data, className, value, children, ...args } = props;

  const child = value ?? children;
  const isSuccess = judgeIsSuccess(data);

  return (
    <View {...args} className={classNames('y-page', className)} >
      {isSuccess && child}
      <ResponseError loading={loading} response={data} />
      <Loading isFull iconSize='extra-large' loading={loading} />
    </View>
  );
});
