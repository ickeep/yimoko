import { Skeleton, Image, Grid as TGrid, GridItem } from '@antmjs/vantui';
import { GridProps as TGridProps } from '@antmjs/vantui/types/grid';

import { ImageProps } from '@antmjs/vantui/types/image';
import { SkeletonProps } from '@antmjs/vantui/types/skeleton';
import { observer, useExpressionScope } from '@formily/react';
import { useAPIOptions, defaultOutOptionsKeys, IOptionsOutAPIProps, judgeIsEmpty, useSchemaItems, getItemPropsBySchema } from '@yimoko/store';
import { useMemo } from 'react';

import { handleClick } from '../tools/handle-click';
import { templateConvertForProps } from '../tools/template';

export type GridProps = TGridProps & IOptionsOutAPIProps & {
  image?: ImageProps
  skeleton?: Omit<SkeletonProps, 'loading' | 'children'>
  itemURLPrefix?: string
  itemDefault?: Record<string, any>
};

export const Grid = observer((props: GridProps) => {
  const { className, options, api, keys, splitter, image, skeleton, itemURLPrefix, itemDefault, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, { ...defaultOutOptionsKeys, ...keys }, splitter);
  const curItems = useSchemaItems();
  const scope = useExpressionScope();

  const curChildren = useMemo(() => {
    const dataChildren = data?.map?.((item, i) => {
      const { title, desc, img, url, click, routeType, ...args } = item;
      return (
        <GridItem key={`d-${i}`} text={title} onClick={() => handleClick({ ...itemDefault, ...item }, itemURLPrefix, i)} {...args}  >
          {img && <Image fit="cover" height="100%" width="100%" {...image} src={img} />}
        </GridItem>
      );
    });

    const itemChildren = curItems.map?.((item, i) => {
      const props = templateConvertForProps(getItemPropsBySchema(item, 'GridItem', i), scope);
      return <GridItem key={`i-${i}`} onClick={() => handleClick({ ...itemDefault, ...props }, itemURLPrefix, i)} {...props} />;
    });

    return [...dataChildren, ...itemChildren];
  }, [curItems, data, image, itemDefault, itemURLPrefix, scope]);

  return (
    <Skeleton {...skeleton} loading={loading}>
      {/* Grid 组件 children 不支持 空 */}
      {!judgeIsEmpty(curChildren) && <TGrid {...args} >{curChildren}</TGrid>}
    </Skeleton>
  );
});
