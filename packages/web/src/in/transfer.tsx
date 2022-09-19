import { useField, observer } from '@formily/react';
import { useAPIOptions, IOptionsAPIProps } from '@yimoko/store';
import { Spin, Transfer as ATransfer, TransferProps as ATransferProps } from 'antd';
import { useMemo, Key } from 'react';

const transferDefaultKeys = {
  key: 'key',
  title: 'title',
  disabled: 'disabled',
  description: 'description',
};

export const Transfer = observer((props: TransferProps) => {
  const { value, options, dataSource, api, keys, splitter, targetKeys, ...rest } = props;
  const [data, loading] = useAPIOptions(options, api, { ...transferDefaultKeys, ...keys }, splitter) as [any[], boolean, Function];

  return <Spin spinning={loading}><ATransfer render={item => item.title} {...rest} dataSource={data} targetKeys={targetKeys ?? value} /></Spin>;
});


export type TransferProps<T extends object = Record<Key, any>> =
  ATransferProps<T>
  & { value?: ATransferProps<T>['targetKeys'] }
  & IOptionsAPIProps<'key' | 'title' | 'disabled' | 'description'>;


