import { Skeleton, Image } from '@antmjs/vantui';
import { ImageProps } from '@antmjs/vantui/types/image';
import { observer, useExpressionScope } from '@formily/react';
import { Swiper as TSwiper, SwiperItem, SwiperProps as TSwiperProps, View } from '@tarojs/components';
import { useAPIOptions, defaultOutOptionsKeys, IOptionsOutAPIProps, useSchemaItems, getItemPropsBySchema } from '@yimoko/store';
import classNames from 'classnames';
import React, { Key, useMemo } from 'react';

import { Text } from '../base/text';
import { handleClick } from '../tools/handle-click';
import { templateConvertForProps } from '../tools/template';

export type SwiperProps = Omit<TSwiperProps, 'style'> & IOptionsOutAPIProps & {
  value?: any;
  height?: number | string;
  itemStyle?: React.CSSProperties
  style?: React.CSSProperties
  image?: ImageProps
  textStyle?: React.CSSProperties
  titleStyle?: React.CSSProperties
  descStyle?: React.CSSProperties
  itemURLPrefix?: string
  itemDefault?: Record<Key, any>
};

export const Swiper = observer((props: SwiperProps) => {
  const {
    className, options, api, keys, splitter, value, children, style, itemURLPrefix, itemDefault,
    height = '160rpx', itemStyle, image, textStyle, titleStyle, descStyle, ...args
  } = props;
  const [data, loading] = useAPIOptions(options, api, { ...defaultOutOptionsKeys, ...keys }, splitter);
  const curItemStyle = useMemo(() => ({ height, ...itemStyle }), [height, itemStyle]);
  const curStyle = useMemo(() => ({ height, ...style }), [height, style]);
  const curItems = useSchemaItems();
  const scope = useExpressionScope();

  const curChildren = useMemo(() => {
    const dataChildren = data?.map?.((item, i) => (
      <SwiperItem key={`data-${i}`} style={curItemStyle} onClick={() => handleClick({ ...itemDefault, ...item }, itemURLPrefix, i)}>
        <Image width="100%" height={height} fit="cover" {...image} src={item.img} />
        <View className='c-text' style={textStyle}>
          {item.title && <Text style={titleStyle}>{item.title}</Text>}
          {item.desc && <Text size="small" style={descStyle}>{item.desc}</Text>}
        </View>
      </SwiperItem>
    ));

    const itemChildren = curItems.map?.((item, i) => {
      const props = templateConvertForProps(getItemPropsBySchema(item, 'SwiperItem', i), scope);
      return <SwiperItem key={`i-${i}`} style={curItemStyle} onClick={() => handleClick({ ...itemDefault, props }, itemURLPrefix, i)} {...props} />;
    });

    return [...dataChildren, ...itemChildren];
  }, [curItemStyle, curItems, data, descStyle, height, image, itemDefault, itemURLPrefix, scope, textStyle, titleStyle]);

  return (
    <Skeleton loading={loading}>
      <TSwiper {...args} style={curStyle} className={classNames('y-swiper', className)}>
        {curChildren}
      </TSwiper>
    </Skeleton>
  );
});
