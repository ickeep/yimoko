import { Sidebar as TSidebar, SidebarItem } from '@antmjs/vantui';
import { SidebarProps as TSidebarProps } from '@antmjs/vantui/types/sidebar';
import { RecursionField } from '@formily/react';
import { ITouchEvent } from '@tarojs/components';
import { IOptionsAPIProps, useAPIOptions, useSchemaItems } from '@yimoko/store';
import { useMemo, useState } from 'react';

import { handleClick } from '../tools/handle-click';

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
};

export const Sidebar = (props: SidebarProps) => {
  const { value, options, api, keys, splitter, onChange, children, ...args } = props;
  const [data] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter);
  const [val, setVal] = useState<SidebarProps['value']>();
  const curItems = useSchemaItems();

  const isControlled = value !== undefined;
  const curValue = useMemo(() => (!isControlled ? val : value) ?? 0, [isControlled, val, value]);

  const dataChildren = useMemo(
    () => data?.map((item, i) => (
      <SidebarItem key={`data-${i}`}  {...item} onClick={() => handleClick(item)} />
    )),
    [data],
  );

  // eslint-disable-next-line complexity
  const itemChildren = useMemo(() => curItems.map?.((item, i) => {
    const { 'x-component': component, 'x-decorator': decorator, 'x-decorator-props': itemProps, ...args } = item;
    if (component === 'SidebarItem') {
      const cProps = args['x-component-props'];
      if (args.properties) {
        cProps.renderTitle = <RecursionField schema={item} name={i} onlyRenderProperties />;
      }
      return <SidebarItem key={`item-${i}`} name={`item-${i}`} {...cProps} />;
    }

    return (
      <SidebarItem
        key={`item-${i}`}
        {...((!decorator || decorator === 'SidebarItem') ? itemProps : {})}
        renderTitle={<RecursionField schema={{ ...args, 'x-component': component }} name={i} />}
      />
    );
  }), [curItems]);

  const curChildren = useMemo(() => [...dataChildren, ...itemChildren], [dataChildren, itemChildren]);

  const curProps = {
    ...args,
    activeKey: curValue,
    onChange: (e: { detail?: number }) => {
      onChange?.(e.detail);
      !isControlled && setVal(e.detail);
    },
  };

  return <TSidebar {...curProps} >{curChildren}</TSidebar>;
};
