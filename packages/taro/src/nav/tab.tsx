import { Tabs as TTabs, Tab as TTab } from '@antmjs/vantui';
import { TabsProps as TTabsProps } from '@antmjs/vantui/types/tab';
import { useExpressionScope } from '@formily/react';
import { ITouchEvent } from '@tarojs/components';
import { IOptionsAPIProps, useAPIOptions, useSchemaItems, getItemPropsBySchema, withSchemaChildren } from '@yimoko/store';
import { useMemo, useState } from 'react';

import { handleClick } from '../tools/handle-click';
import { templateConvertForProps } from '../tools/template';

export const Tab = withSchemaChildren(TTab);

const defaultKeys = {
  dot: 'dot',
  info: 'info',
  title: 'title',
  disabled: 'disabled',
  titleStyle: 'titleStyle',
  name: 'name',
  children: 'children',

  value: 'value',
  schema: 'schema',
  values: 'values',
};

export type TabsProps = Omit<TTabsProps, 'active' | 'onChange'> & IOptionsAPIProps<keyof typeof defaultKeys> & {
  value?: any,
  // 为 tab 渲染数据来源 key 对应 tab value
  dataSource?: Record<string, any>
  onChange?: (value: any, e?: ITouchEvent) => void;
  itemURLPrefix?: string
  itemDefault?: Record<string, any>
};

export const Tabs = (props: TabsProps) => {
  const { value, options, api, keys, splitter, onChange, children, dataSource, itemURLPrefix, itemDefault, ...args } = props;
  const [data] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter);
  const [val, setVal] = useState<TabsProps['value']>();
  const curItems = useSchemaItems();
  const scope = useExpressionScope();

  const isControlled = value !== undefined;

  const curChildren = useMemo(
    () => {
      const dataChildren = data?.map((item, i) => {
        const name = item.name ?? `d-${i}`;
        return <Tab key={name}
          onClick={() => handleClick({ ...itemDefault, ...item }, itemURLPrefix, i)} {...item}
          name={name}
          model={{ values: dataSource?.[name] }} />;
      });

      const cLen = dataChildren.length;
      const itemChildren = curItems.map?.((item, i) => {
        const props = templateConvertForProps(getItemPropsBySchema(item, 'Tab', i), scope);
        const name = props?.name ?? `i-${cLen + i}`;

        return (
          <Tab
            key={name}
            name={name}
            onClick={() => handleClick({ ...itemDefault, ...props }, itemURLPrefix, i)}
            {...props}
            model={{ values: dataSource?.[name] }} />
        );
      });
      return [...dataChildren, ...itemChildren];
    },
    [curItems, data, dataSource, itemDefault, itemURLPrefix, scope],
  );

  const curValue = useMemo(() => (!isControlled ? val : value) ?? 0, [isControlled, val, value]);

  return (
    <TTabs
      {...args}
      active={curValue}
      onChange={(e) => {
        onChange?.(e.detail.name);
        !isControlled && setVal(e.detail.name);
      }} >
      {curChildren}
    </TTabs>
  );
};
