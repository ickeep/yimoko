import { Sidebar as TSidebar, SidebarItem } from '@antmjs/vantui';
import { SidebarProps as TSidebarProps } from '@antmjs/vantui/types/sidebar';
import { useExpressionScope } from '@formily/react';
import { ITouchEvent } from '@tarojs/components';
import { getItemPropsBySchema, IOptionsAPIProps, useAPIOptions, useSchemaItems } from '@yimoko/store';
import { useMemo, useState } from 'react';

import { handleClick } from '../tools/handle-click';
import { templateCovnForProps } from '../tools/template';

const defaultKeys = {
  dot: 'dot',
  badge: 'badge',
  info: 'info',
  title: 'title',
  disabled: 'disabled',
};

export type SidebarProps = Omit<TSidebarProps, 'activeKey'> & IOptionsAPIProps<keyof typeof defaultKeys> & {
  value?: number,
  onChange?: (value: any, e?: ITouchEvent) => void;
  itemURLPrefix?: string
};

export const Sidebar = (props: SidebarProps) => {
  const { value, options, api, keys, splitter, onChange, children, itemURLPrefix, ...args } = props;
  const [data] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter);
  const [val, setVal] = useState<SidebarProps['value']>();
  const curItems = useSchemaItems();
  const scope = useExpressionScope();

  const isControlled = value !== undefined;
  const curValue = useMemo(() => (!isControlled ? val : value) ?? 0, [isControlled, val, value]);

  const curChildren = useMemo(() => {
    const dataChildren = data?.map((item, i) => <SidebarItem key={`d-${i}`} onClick={() => handleClick(item, itemURLPrefix, i)} {...item} />);

    const itemChildren = curItems.map?.((item, i) => {
      const props = templateCovnForProps(getItemPropsBySchema(item, 'SidebarItem', i), scope);
      return <SidebarItem key={`i-${i}`} onClick={() => handleClick(props, itemURLPrefix, i)} renderTitle={props.children} {...props} />;
    });

    return [...dataChildren, ...itemChildren];
  }, [curItems, data, itemURLPrefix, scope]);

  return (
    <TSidebar
      {...args}
      activeKey={curValue}
      onChange={(e: { detail?: number }) => {
        onChange?.(e.detail);
        !isControlled && setVal(e.detail);
      }}
    >
      {curChildren}
    </TSidebar>
  );
};
