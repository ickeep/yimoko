import { Skeleton, Image, CellGroup as TCellGroup, Cell as TCell } from '@antmjs/vantui';
import { CellGroupProps as TCellGroupProps } from '@antmjs/vantui/types/cell';

import { ImageProps } from '@antmjs/vantui/types/image';
import { observer, useExpressionScope } from '@formily/react';
import { useAPIOptions, defaultOutOptionsKeys, IOptionsOutAPIProps, withValueChildren, useSchemaItems, getItemPropsBySchema } from '@yimoko/store';
import classNames from 'classnames';
import { useMemo } from 'react';

import { handleClick } from '../tools/handle-click';
import { templateCovnForProps } from '../tools/template';

export type CellGroupProps = TCellGroupProps & IOptionsOutAPIProps & {
  image?: ImageProps
  itemURLPrefix?: string
};

export const Cell = withValueChildren(TCell);

export const CellGroup = observer((props: CellGroupProps) => {
  const { className, options, api, keys, splitter, image, itemURLPrefix, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, { ...defaultOutOptionsKeys, ...keys }, splitter);
  const curItems = useSchemaItems();
  const scope = useExpressionScope();

  const curChildren = useMemo(() => {
    const dataChildren = data?.map?.((item, i) => {
      const { desc, img, url, click, routeType, ...args } = item;
      return (
        <TCell key={`data-${i}`} onClick={() => handleClick(item, itemURLPrefix, i)} label={desc} {...args}  >
          {img && <Image fit="cover" height="100%" width="100%" {...image} src={img} />}
        </TCell>
      );
    });

    const itemChildren = curItems.map?.((item, i) => {
      const props = templateCovnForProps(getItemPropsBySchema(item, 'Cell', i), scope);
      return <TCell key={`i-${i}`} onClick={() => handleClick(props, itemURLPrefix, i)} {...props} />;
    });

    return [...dataChildren, ...itemChildren];
  }, [curItems, data, image, itemURLPrefix, scope]);

  return (
    <Skeleton loading={loading}>
      <TCellGroup {...args} className={classNames('y-grid', className)}>
        {curChildren}
      </TCellGroup>
    </Skeleton>
  );
});
