import { Skeleton, Card as TCard } from '@antmjs/vantui';
import { SkeletonProps } from '@antmjs/vantui/types/skeleton';
import { observer, useExpressionScope } from '@formily/react';
import { View, ViewProps } from '@tarojs/components';
import { getItemPropsBySchema, IOptionsAPIProps, useAPIOptions, useSchemaItems } from '@yimoko/store';
import { useMemo } from 'react';

import { handleClick } from '../tools/handle-click';
import { templateCovnForProps } from '../tools/template';

export const Card = TCard;

export const cardDefaultKeys = {
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

export type CardlistProps = ViewProps & IOptionsAPIProps<keyof typeof cardDefaultKeys> & {
  skeleton?: Omit<SkeletonProps, 'loading' | 'children'>
  itemURLPrefix?: string
};

export const Cardlist = observer((props: CardlistProps) => {
  const { options, api, keys, splitter, skeleton, itemURLPrefix, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, { ...cardDefaultKeys, ...keys }, splitter) as [any[], boolean, Function];
  const curItems = useSchemaItems();
  const scope = useExpressionScope();

  const curChildren = useMemo(() => {
    const dataChildren = data?.map((item, i) => (
      <TCard key={`d-${i}`} price="" onClick={() => handleClick(item, itemURLPrefix, i)} {...item} />
    ));

    const itemChildren = curItems.map?.((item, i) => {
      const props = templateCovnForProps(getItemPropsBySchema(item, 'Card', i), scope);
      return <TCard key={`i-${i}`} price="" onClick={() => handleClick(props, itemURLPrefix, i)} {...props} />;
    });

    return [...dataChildren, ...itemChildren];
  }, [curItems, data, itemURLPrefix, scope]);

  return (
    <Skeleton {...skeleton} loading={loading}>
      <View {...args}>
        {curChildren}
      </View>
    </Skeleton>
  );
});
