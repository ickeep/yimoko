import { Skeleton, Image } from '@antmjs/vantui';
import { observer } from '@formily/reactive-react';
import { Swiper as TSwiper, SwiperItem, SwiperProps as TSwiperProps } from '@tarojs/components';
import { judgeIsEmpty } from '@yimoko/store';
import { useCallback, useEffect, useState } from 'react';

import { httpRequest, IHTTPConfig, judgeIsSuccess } from '../adapter/http';

import { Text } from './text';
import { View } from './view';

export type IOptions<T extends string = 'label' | 'value'> = Record<T | string, any>[];

export type IKeys<T extends string = 'label' | 'value'> = Record<T | string, string>;

export type IAPI = IHTTPConfig & { paramKey?: string, isSearch?: boolean, isEmptyRequest?: boolean };

export interface IOptionsProps<T extends string = 'label' | 'value'> {
  keys?: IKeys<T>
  options?: IOptions<T>
  api?: IAPI
}

export type SwiperProps = TSwiperProps & IOptionsProps<'title' | 'desc' | 'img' | 'url' | 'click'> & {
  value?: any;
};
export const Swiper = observer((props: SwiperProps) => {
  const { keys, options, api, value, ...args } = props;
  const [data, loading] = useOptions(options, '', keys, api);
  return (
    <Skeleton loading={loading}>
      <TSwiper {...args}>
        {data?.map?.((item, i) => (
          // @ts-ignore
          <SwiperItem key={item.title ?? i}>
            <Image width="100px" height="100px" fit="cover" src={item.url} />
            <View>
              <Text>{item.title}</Text>
              {item.desc && <Text>{item.desc}</Text>}
            </View>
          </SwiperItem>
        ))}
      </TSwiper>
    </Skeleton>
  );
});

const transformOptions = (options?: IOptions, keys?: IKeys) => {
  if (!keys) {
    return options ?? [];
  }
  return options?.map((item) => {
    const newItem = { ...item };
    Object.entries(keys).forEach(([key, value]) => {
      value && (newItem[key] = item[value]);
    });
    return newItem;
  }) ?? [];
};

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
      const res = await httpRequest({ ...args, data: apiData });
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
