import { Skeleton, Image } from '@antmjs/vantui';
import { observer } from '@formily/react';
import { Swiper as TSwiper, SwiperItem, SwiperProps as TSwiperProps } from '@tarojs/components';
import { useAPIOptions, IOptionsAPIProps } from '@yimoko/store';

import { Text } from './text';
import { View } from './view';


export type SwiperProps = TSwiperProps & IOptionsAPIProps<'title' | 'desc' | 'img' | 'url' | 'click'> & {
  value?: any;
};

const defaultKeys = { title: 'title', desc: 'desc', img: 'img', url: 'url', click: 'click' };

export const Swiper = observer((props: SwiperProps) => {
  const { options, api, keys, splitter, value, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter);
  return (
    <Skeleton loading={loading}>
      <TSwiper {...args}>
        {data?.map?.((item, i) => (
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
