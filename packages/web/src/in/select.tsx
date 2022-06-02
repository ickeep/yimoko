import { Select as TSelect } from '@formily/antd';
import { observer } from '@formily/reactive-react';
import { IOptions, IKeys, judgeIsEmpty, transformOptions } from '@yimoko/store';
import { SelectProps as TSelectProps } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { useState, useCallback, useEffect } from 'react';

import { httpRequest, judgeIsSuccess } from '../http';

export type SelectProps = TSelectProps & IOptionsProps;

export const Select = observer((props: SelectProps) => {
  const { keys, options, api, ...args } = props;
  const [searchVal, setSearchVal] = useState('');
  const [data, loading] = useOptions(options, searchVal, keys, api);
  return (<TSelect
    allowClear
    optionFilterProp="label"
    showSearch={api?.isSearch}
    loading={loading}
    options={data}
    {...args}
    searchValue={searchVal}
    onSearch={setSearchVal}
    onChange={(e) => {
      console.log('onChange', e);
    }}
  />);
});


export type IAPI = AxiosRequestConfig & { paramKey?: string, isSearch?: boolean, isEmptyRequest?: boolean };
export interface IOptionsProps<T extends string = 'label' | 'value'> {
  keys?: IKeys<T>
  options?: IOptions<T>
  api?: IAPI
}


const useOptions = (options?: IOptions, input?: string, keys?: IKeys, api?: IAPI): [IOptions, boolean] => {
  const [data, setData] = useState<IOptions>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // eslint-disable-next-line complexity
  const getAPIData = useCallback(async (value?: string) => {
    if (api) {
      const { paramKey = 'name', isSearch = false, isEmptyRequest = false, data: apiData = {}, ...args } = api;
      if (isSearch) {
        if (!isEmptyRequest && judgeIsEmpty(value)) {
          return [];
        }
        apiData[paramKey] = value;
      }
      setLoading(true);
      const res = await httpRequest({ ...args, params: apiData, data: apiData });
      setLoading(false);
      if (judgeIsSuccess(res)) {
        return transformOptions(res.data, keys);
      }
      return null;
    }
    return null;
  }, [api, keys]);

  useEffect(() => {
    !api?.isSearch && getAPIData().then(data => data && setData(data));
  }, [api, getAPIData]);

  useEffect(() => {
    api?.isSearch && getAPIData(input).then(data => data && setData(data));
  }, [input, getAPIData, api]);

  useEffect(() => {
    setData(transformOptions(options, keys));
  }, [keys, options]);

  return [data, loading];
};
