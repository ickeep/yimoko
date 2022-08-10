import { Skeleton, Image } from '@antmjs/vantui';
import { ImageProps } from '@antmjs/vantui/types/image';
import { observer, RecursionField } from '@formily/react';
import { Swiper as TSwiper, SwiperItem, SwiperProps as TSwiperProps } from '@tarojs/components';
import { useAPIOptions, defaultOutOptionsKeys, IOptionsOutAPIProps, useSchemaItems } from '@yimoko/store';
import classNames from 'classnames';
import React, { useMemo } from 'react';

import { Text } from '../base/text';
import { View } from '../base/view';
import { handleClick } from '../tools/handle-click';
import { getCssSize } from '../tools/style';

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
  const {
    className, options, api, keys, splitter, value, children,
    height = 300, itemStyle, image, textStyle, titleStyle, descStyle, ...args
  } = props;
  const [data, loading] = useAPIOptions(options, api, { ...defaultOutOptionsKeys, ...keys }, splitter);
  const curHeight = useMemo(() => getCssSize(height), [height]);
  const curItemStyle = useMemo(() => ({ height: curHeight, ...itemStyle }), [curHeight, itemStyle]);
  const curItems = useSchemaItems();

  return (
    <Skeleton loading={loading}>
      <TSwiper {...args} className={classNames('y-swiper', className)}>
        {data?.map?.((item, i) => (
          <SwiperItem key={`data-${i}`} style={curItemStyle} onClick={() => handleClick(item, i)}>
            <Image width="100%" height={curHeight} fit="cover" {...image} src={item.img} />
            <View className='c-text' style={textStyle}>
              {item.title && <Text style={titleStyle}>{item.title}</Text>}
              {item.desc && <Text size="small" style={descStyle}>{item.desc}</Text>}
            </View>
          </SwiperItem>
        ))}
        {curItems.map?.((item, i) => (
          <SwiperItem key={`item-${i}`} style={curItemStyle}>
            <RecursionField schema={item} name={i} />
          </SwiperItem>
        ))}
        {children}
      </TSwiper>
    </Skeleton>
  );
});
