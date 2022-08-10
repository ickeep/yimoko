import { Skeleton, Image, Grid as TGrid, GridItem } from '@antmjs/vantui';
import { GridProps as TGridProps } from '@antmjs/vantui/types/grid';

import { ImageProps } from '@antmjs/vantui/types/image';
import { observer, RecursionField } from '@formily/react';
import { useAPIOptions, defaultOutOptionsKeys, IOptionsOutAPIProps, judgeIsEmpty, useSchemaItems } from '@yimoko/store';
import classNames from 'classnames';

import { handleClick } from '../tools/handle-click';

export type GridProps = TGridProps & IOptionsOutAPIProps & {
  image?: ImageProps
};

export const Grid = observer((props: GridProps) => {
  const { className, options, api, keys, splitter, image, ...args
  } = props;
  const [data, loading] = useAPIOptions(options, api, { ...defaultOutOptionsKeys, ...keys }, splitter);
  const curItems = useSchemaItems();

  return (
    <Skeleton loading={loading}>
      {/* Grid 组件 childern 不支持 空 */}
      {!judgeIsEmpty(options) && <TGrid {...args} className={classNames('y-grid', className)}>
        {options?.map?.((item, i) => {
          const { title, desc, img, url, click, routeType, ...args } = item;
          return (
            <GridItem key={`data-${i}`} text={title} {...args} onClick={() => handleClick(item, i)} >
              {img && <Image fit="cover" height="100%" width="100%" {...image} src={img} />}
            </GridItem>
          );
        })}
      </TGrid>
      }
      {!judgeIsEmpty(curItems) && <TGrid {...args} className={classNames('y-grid', className)}>
        {curItems.map?.((item, i) => (
          <GridItem key={data.length ?? 0 + i} >
            <RecursionField schema={item} name={i} />
          </GridItem>
        ))}
      </TGrid>
      }
    </Skeleton>
  );
});
