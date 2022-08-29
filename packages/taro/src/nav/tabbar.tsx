import { Tabbar as TTabbar, TabbarItem as TTabbarItem, Image } from '@antmjs/vantui';
import { ImageProps } from '@antmjs/vantui/types/image';
import { TabbarProps as TTabbarProps, TabbarItemProps as TTabbarItemProps } from '@antmjs/vantui/types/tabbar';
import { useExpressionScope } from '@formily/react';
import { IOptionsAPIProps, useAPIOptions, useSchemaItems, getItemPropsBySchema } from '@yimoko/store';
import { useMemo, useState } from 'react';

import { handleClick } from '../tools/handle-click';
import { templateConvertForProps } from '../tools/template';

export interface TabbarItemProps extends TTabbarItemProps {
  img?: string
  imgActive?: string
  imgProps?: Omit<ImageProps, | 'src' | 'ref'>
}

const imgDftProps = {
  mode: 'aspectFit',
  width: 32,
  height: 32,
};

export const TabbarItem = (props: TabbarItemProps) => {
  const { img, imgActive, renderIcon, renderIconActive, imgProps, ...args } = props;
  const curRenderIcon = useMemo(
    () => ((img && !renderIcon) ? <Image {...imgDftProps} {...imgProps} src={img} /> : renderIcon),
    [img, imgProps, renderIcon],
  );
  const curRenderActive = useMemo(
    () => (
      (imgActive && !renderIcon) ? <Image {...imgDftProps}  {...imgProps} src={imgActive} /> : renderIconActive),
    [imgActive, imgProps, renderIcon, renderIconActive],
  );

  return <TTabbarItem {...args} renderIcon={curRenderIcon} renderIconActive={curRenderActive} />;
};

const defaultKeys = {
  dot: 'dot',
  info: 'info',
  icon: 'icon',
  iconPrefix: 'iconPrefix',
  img: 'img',
  name: 'name',
  imgProps: 'imgProps',
  children: 'children',
};

export type TabbarProps = Omit<TTabbarProps, 'active' | 'onChange'> & IOptionsAPIProps<keyof typeof defaultKeys> & {
  value?: string | number,
  onChange?: (value: string | number) => void;
  itemURLPrefix?: string
  itemDefault?: Record<string, any>
};

export const Tabbar = (props: TabbarProps) => {
  const { value, options, api, keys, splitter, onChange, children, itemURLPrefix, itemDefault, ...args } = props;
  const [data] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter);
  const [val, setVal] = useState<TabbarProps['value']>();
  const curItems = useSchemaItems();
  const scope = useExpressionScope();

  const isControlled = value !== undefined;

  const curChildren = useMemo(
    () => {
      const dataChildren = data?.map((item, i) => {
        const name = item.name ?? `d-${i}`;
        return <TabbarItem key={name} onClick={() => handleClick({ ...itemDefault, ...item }, itemURLPrefix, i)} {...item} name={name} />;
      });

      const itemChildren = curItems.map?.((item, i) => {
        const props = templateConvertForProps(getItemPropsBySchema(item, 'TabbarItem', i), scope);
        const name = props?.name ?? `i-${i}`;
        return <TabbarItem key={name} name={name} onClick={() => handleClick({ ...itemDefault, ...props }, itemURLPrefix, i)} {...props} />;
      });
      return [...dataChildren, ...itemChildren];
    },
    [curItems, data, itemDefault, itemURLPrefix, scope],
  );

  const curValue = useMemo(() => (!isControlled ? val : value) ?? 0, [isControlled, val, value]);

  return (
    <TTabbar
      {...args}
      active={curValue}
      onChange={(e) => {
        onChange?.(e.detail);
        !isControlled && setVal(e.detail);
      }} >
      {curChildren}
    </TTabbar>
  );
};
