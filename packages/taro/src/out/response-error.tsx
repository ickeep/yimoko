import { observer } from '@formily/react';
import { IStoreResponse, judgeIsSuccess } from '@yimoko/store';


import { View } from './view';

export interface ResponseErrorProps {
  loading?: boolean;
  response: IStoreResponse<any, any>;
}
export const ResponseError = observer((props: ResponseErrorProps) => {
  const { loading, response } = props;
  const isSuccess = judgeIsSuccess(response);

  if (loading || isSuccess) {
    return null;
  }

  return <View>{response?.data?.message}</View>;
});
