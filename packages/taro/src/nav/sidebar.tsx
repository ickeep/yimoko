import { Sidebar as TSidebar, SidebarItem } from '@antmjs/vantui';
import { SidebarProps as TSidebarProps } from '@antmjs/vantui/types/sidebar';
import { useExpressionScope } from '@formily/react';
import { ITouchEvent } from '@tarojs/components';
import { getItemPropsBySchema, IOptionsAPIProps, judgeIsEmpty, useAPIOptions, useSchemaItems } from '@yimoko/store';
import { ReactNode, useMemo, useState } from 'react';

import { handleClick } from '../tools/handle-click';
import { templateCovnForProps } from '../tools/template';

const defaultKeys = {
  dot: 'dot',
  badge: 'badge',
  info: 'info',
  title: 'title',
  disabled: 'disabled',
};

export type SidebarProps = Omit<TSidebarProps, 'activeKey' | 'children'> & IOptionsAPIProps<keyof typeof defaultKeys> & {
  value?: number,
  onChange?: (value: any, e?: ITouchEvent) => void;
  itemURLPrefix?: string
  children?: ReactNode
};

export const Sidebar = (props: SidebarProps) => {
  const { value, options, api, keys, splitter, onChange, children, itemURLPrefix, ...args } = props;
  const [data] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter);
  const [val, setVal] = useState<SidebarProps['value']>();
  const curItems = useSchemaItems();
  const scope = useExpressionScope();

  const isControlled = value !== undefined;
  const curValue = useMemo(() => (!isControlled ? val : value) ?? 0, [isControlled, val, value]);

  const dataChildren = useMemo(() => data?.map((item, i) => (
    <SidebarItem key={`d-${i}`} onClick={() => handleClick(item, itemURLPrefix, i)} {...item} />
  )), [data, itemURLPrefix]);

  const itemChildren = useMemo(() => curItems.map?.((item, i) => {
    const props = templateCovnForProps(getItemPropsBySchema(item, 'SidebarItem', i), scope);
    return <SidebarItem key={`i-${i}`} onClick={() => handleClick(props, itemURLPrefix, i)} renderTitle={props.children} {...props} />;
  }), [curItems, scope, itemURLPrefix]);

  const allChildren = useMemo(() => {
    const arr = [...dataChildren, ...itemChildren];
    if (judgeIsEmpty(arr)) {
      return children;
    }
    if (judgeIsEmpty(children)) {
      return arr;
    }
    return Array.isArray(children) ? [...arr, ...children] : [...arr, children];
  }, [children, dataChildren, itemChildren]);


  // 如 allChildren 晚于 TSidebar 渲染 activeKey 值无效
  if (judgeIsEmpty(allChildren)) {
    return null;
  }

  return (
    <TSidebar
      {...args}
      activeKey={curValue}
      onChange={(e: { detail?: number }) => {
        onChange?.(e.detail);
        !isControlled && setVal(e.detail);
      }}
    >
      {allChildren}
    </TSidebar>
  );
};

