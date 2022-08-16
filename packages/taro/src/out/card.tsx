import { Skeleton, Card as TCard } from '@antmjs/vantui';
import { SkeletonProps } from '@antmjs/vantui/types/skeleton';
import { observer } from '@formily/react';
import { View, ViewProps } from '@tarojs/components';
import { getItemPropsBySchema, IOptionsAPIProps, useAPIOptions, useSchemaItems } from '@yimoko/store';
import { useMemo } from 'react';

import { handleClick } from '../tools/handle-click';

export const Card = TCard;

const defaultKeys = {
  tag: 'tag',
  num: 'num',
  desc: 'desc',
  thumb: 'thumb',
  title: 'title',
  price: 'price',
  centered: 'centered',
  lazyLoad: 'lazyLoad',
  thumbLink: 'thumbLink',
  originPrice: 'originPrice',
  thumbMode: 'thumbMode',
  currency: 'currency',
};

export type CardlistProps = ViewProps & IOptionsAPIProps<keyof typeof defaultKeys> & {
  skeleton?: Omit<SkeletonProps, 'loading' | 'children'>
};

export const Cardlist = observer((props: CardlistProps) => {
  const { options, api, keys, splitter, skeleton, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter) as [any[], boolean, Function];
  const curItems = useSchemaItems();

  const curChildren = useMemo(() => {
    const dataChildren = data?.map((item, i) => (
      <TCard key={`d-${i}`} price="" onClick={() => handleClick(item, i)} {...item} />
    ));

    const itemChildren = curItems.map?.((item, i) => {
      const props = getItemPropsBySchema(item, 'Card', i);
      return <TCard key={`i-${i}`} price="" onClick={() => handleClick(item, i)} {...props} />;
    });

    return [...dataChildren, ...itemChildren];
  }, [curItems, data]);

  return (
    <Skeleton {...skeleton} loading={loading}>
      <View {...args}>
        {curChildren}
      </View>
    </Skeleton>
  );
});
