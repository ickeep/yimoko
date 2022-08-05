import { Skeleton, Image } from '@antmjs/vantui';
import { ImageProps } from '@antmjs/vantui/types/image';
import { observer, RecursionField, useFieldSchema } from '@formily/react';
import { Swiper as TSwiper, SwiperItem, SwiperProps as TSwiperProps } from '@tarojs/components';
import { useAPIOptions, defaultOutOptionsKeys, IOptionsOutAPIProps } from '@yimoko/store';
import classNames from 'classnames';
import React, { useMemo } from 'react';

import { handleClick } from '../tools/handle-click';
import { getCssSize } from '../tools/style';

import { Text } from './text';
import { View } from './view';

export type SwiperProps = TSwiperProps & IOptionsOutAPIProps & {
  value?: any;
  height?: number;
  itemStyle?: React.CSSProperties
  image?: ImageProps
  textStyle?: React.CSSProperties
  titleStyle?: React.CSSProperties
  descStyle?: React.CSSProperties
};

export const Swiper = observer((props: SwiperProps) => {
  const { className, options, api, keys, splitter, value, height = 300, itemStyle, image, textStyle, titleStyle, descStyle, ...args } = props;
  const { items } = useFieldSchema();
  const [data, loading] = useAPIOptions(options, api, { ...defaultOutOptionsKeys, ...keys }, splitter);
  const curHeight = useMemo(() => getCssSize(height), [height]);
  const curItemStyle = useMemo(() => ({ height: curHeight, ...itemStyle }), [curHeight, itemStyle]);

  const curItems = useMemo(() => {
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }, [items]);

  return (
    <Skeleton loading={loading}>
      <TSwiper {...args} className={classNames('y-swiper', className)}>
        {data?.map?.((item, i) => (
          <SwiperItem key={i} style={curItemStyle} onClick={() => handleClick(item, i)}>
            <Image width="100%" height={curHeight} fit="cover" {...image} src={item.img} />
            <View className='c-text' style={textStyle}>
              {item.title && <Text style={titleStyle}>{item.title}</Text>}
              {item.desc && <Text size="small" style={descStyle}>{item.desc}</Text>}
            </View>
          </SwiperItem>
        ))}
        {curItems.map?.((item, i) => (
          <SwiperItem key={data.length ?? 0 + i} style={curItemStyle}>
            <RecursionField schema={item} name={i} />
          </SwiperItem>
        ))}
      </TSwiper>
    </Skeleton>
  );
});
