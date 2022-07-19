import { Select as TSelect } from '@formily/antd';
import { observer } from '@formily/react';
import { IOptions, IKeys, IOptionsAPISearchConfig, useAPIOptions, useAPISearchOptions, IOptionsAPI, strToArr } from '@yimoko/store';
import { Spin, SelectProps as TSelectProps } from 'antd';
import { useMemo, useState } from 'react';

export type SelectProps = TSelectProps & IOptionsProps;

export const Select = observer((props: SelectProps) => {
  const { splitter, keys, options, api, labelAPI, apiType, searchConfig, value, valueType, mode, onChange, ...args } = props;
  const [searchVal, setSearchVal] = useState('');

  const [data, loading] = apiType === 'search'
    ? useAPISearchOptions(searchVal, value, options, api, labelAPI, searchConfig, keys, splitter)
    : useAPIOptions(options, api, keys, splitter);

  const searchProps = useMemo(() => (apiType !== 'search'
    ? {}
    : {
      showSearch: true,
      filterOption: false,
      searchValue: searchVal,
      onSearch: setSearchVal,
      notFoundContent: loading ? <Spin size='small' /> : null,
    }
  ), [apiType, loading, searchVal]);

  const curValue = useMemo(() => {
    if (mode && ['multiple', 'tags'].includes(mode) && typeof value === 'string') {
      return strToArr(value, splitter);
    }
    return value;
  }, [mode, splitter, value]);

  return (
    <TSelect
      allowClear={!loading}
      loading={loading}
      options={data}
      {...searchProps}
      {...args}
      mode={mode}
      value={curValue}
      onChange={(val, options) => {
        onChange?.(valueType === 'string' && Array.isArray(val) ? val.join(splitter) : val, options);
      }}
    />
  );
});


export interface IOptionsProps<T extends string = 'label' | 'value'> {
  splitter?: string
  keys?: IKeys<T>
  options?: IOptions<T>
  api?: IOptionsAPI
  valueType?: 'none' | 'string' | 'array'
  // 搜索相关参数
  labelAPI?: IOptionsAPI | boolean,
  apiType?: 'search' | 'data'
  searchConfig?: IOptionsAPISearchConfig<T>
}
