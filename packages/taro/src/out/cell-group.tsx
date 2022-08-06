import { Skeleton, Image, CellGroup as TCellGroup, Cell } from '@antmjs/vantui';
import { CellGroupProps as TCellGroupProps } from '@antmjs/vantui/types/cell';

import { ImageProps } from '@antmjs/vantui/types/image';
import { observer, RecursionField, useFieldSchema } from '@formily/react';
import { useAPIOptions, defaultOutOptionsKeys, IOptionsOutAPIProps } from '@yimoko/store';
import classNames from 'classnames';
import { useMemo } from 'react';

import { handleClick } from '../tools/handle-click';

export type CellGroupProps = TCellGroupProps & IOptionsOutAPIProps & {
  image?: ImageProps
};

export const CellGroup = observer((props: CellGroupProps) => {
  const { className, options, api, keys, splitter, image, children, ...args } = props;
  const { items } = useFieldSchema();
  const [data, loading] = useAPIOptions(options, api, { ...defaultOutOptionsKeys, ...keys }, splitter);

  const curItems = useMemo(() => {
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }, [items]);

  return (
    <Skeleton loading={loading}>
      <TCellGroup {...args} className={classNames('y-grid', className)}>
        {options?.map?.((item, i) => {
          const { desc, img, url, click, routeType, ...args } = item;
          return (
            <Cell key={`data-${i}`} label={desc} {...args} onClick={() => handleClick(item, i)} >
              {img && <Image fit="cover" height="100%" width="100%" {...image} src={img} />}
            </Cell>
          );
        })}
        {curItems.map?.((item, i) => (
          <Cell key={data.length ?? 0 + i} >
            <RecursionField schema={item} name={i} />
          </Cell>
        ))}
        {children}
      </TCellGroup>
    </Skeleton>
  );
});
