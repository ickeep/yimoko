import { Skeleton, Image, CellGroup as TCellGroup, Cell as TCell } from '@antmjs/vantui';
import { CellGroupProps as TCellGroupProps } from '@antmjs/vantui/types/cell';

import { ImageProps } from '@antmjs/vantui/types/image';
import { observer, RecursionField } from '@formily/react';
import { useAPIOptions, defaultOutOptionsKeys, IOptionsOutAPIProps, withValueChildren, useSchemaItems } from '@yimoko/store';
import classNames from 'classnames';

import { handleClick } from '../tools/handle-click';

export type CellGroupProps = TCellGroupProps & IOptionsOutAPIProps & {
  image?: ImageProps
};

export const Cell = withValueChildren(TCell);

export const CellGroup = observer((props: CellGroupProps) => {
  const { className, options, api, keys, splitter, image, children, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, { ...defaultOutOptionsKeys, ...keys }, splitter);
  const curItems = useSchemaItems();

  return (
    <Skeleton loading={loading}>
      <TCellGroup {...args} className={classNames('y-grid', className)}>
        {options?.map?.((item, i) => {
          const { desc, img, url, click, routeType, ...args } = item;
          return (
            <TCell key={`data-${i}`} onClick={() => handleClick(item, i)} label={desc} {...args}  >
              {img && <Image fit="cover" height="100%" width="100%" {...image} src={img} />}
            </TCell>
          );
        })}
        {curItems.map?.((item, i) => (
          <TCell key={data.length ?? 0 + i} >
            <RecursionField schema={item} name={i} />
          </TCell>
        ))}
        {children}
      </TCellGroup>
    </Skeleton>
  );
});
