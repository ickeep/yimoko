import { Select as TSelect } from '@formily/antd';
import { observer } from '@formily/reactive-react';
import { IOptions, IKeys, IOptionsAPISearchConfig, useAPIOptions, useAPISearchOptions, IOptionsAPI } from '@yimoko/store';
import { Spin, SelectProps as TSelectProps } from 'antd';
import { useMemo, useState } from 'react';

export type SelectProps = TSelectProps & IOptionsProps;

export const Select = observer((props: SelectProps) => {
  const { splitter, keys, options, api, apiType, searchConfig, value, ...args } = props;
  const [searchVal, setSearchVal] = useState('');

  const [data, loading] = apiType === 'search'
    ? useAPISearchOptions(searchVal, value, options, api, searchConfig, keys, splitter)
    : useAPIOptions(options, api, keys, splitter);

  const searchProps = useMemo(() => {
    const isApiSearch = apiType === 'search';
    if (isApiSearch) {
      return {
        showSearch: true,
        filterOption: false,
        searchValue: searchVal,
        onSearch: setSearchVal,
      };
    }
    return {};
  }, [apiType, searchVal]);

  return (
    <TSelect
      allowClear={!loading}
      notFoundContent={loading ? <Spin size='small' /> : null}
      loading={loading}
      options={data}
      {...searchProps}
      {...args}
      value={value}
    />
  );
});


export interface IOptionsProps<T extends string = 'label' | 'value'> {
  splitter?: string
  keys?: IKeys<T>
  options?: IOptions<T>
  api?: IOptionsAPI
  // 搜索相关参数
  apiType?: 'search' | 'data'
  searchConfig?: IOptionsAPISearchConfig<T>
}
