import { Image, Button } from '@antmjs/vantui';
import { observer } from '@formily/react';
import { View } from '@tarojs/components';
import { IStoreResponse, judgeIsSuccess } from '@yimoko/store';
import { useMemo } from 'react';

import { route } from '../adapter/route';

import { Text } from '../base/text';
import { useConfig } from '../store/config';

export interface ResponseErrorProps {
  isReturnIndex?: boolean
  loading?: boolean;
  response: IStoreResponse<any, any>;
  onAgain?: () => void;
}

// eslint-disable-next-line complexity
export const ResponseError = observer((props: ResponseErrorProps) => {
  const { loading, response, onAgain, isReturnIndex = true } = props;
  const isSuccess = judgeIsSuccess(response);

  const { static: { img }, indexPage } = useConfig();
  const { code, msg } = response;

  const isErr = useMemo(() => !loading && !isSuccess && code, [loading, isSuccess, code]);

  if (!isErr) {
    return null;
  }

  const returnIndex = () => {
    route.redirect(indexPage);
  };

  return (
    <View className='y-err'>
      {img && <Image className='y-err-img' fit="contain" src={`${img}err/${code}.png`} />}
      <Text className='y-err-text' size="large" type='danger'>{msg}</Text>
      <View className='y-err-btns'>
        {isReturnIndex && <Button onClick={() => returnIndex()}>返回首页</Button>}
        {onAgain && <Button type="primary" onClick={() => onAgain()} >再试一次</Button>}
      </View>
    </View>
  );
});
