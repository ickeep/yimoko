import { Collapse as TCollapse, Skeleton, CollapseItem } from '@antmjs/vantui';
import { CollapseItemProps, CollapseProps as TCollapseProps } from '@antmjs/vantui/types/collapse';
import { SkeletonProps } from '@antmjs/vantui/types/skeleton';
import { RecursionField } from '@formily/react';
import { ITouchEvent } from '@tarojs/components';
import { IOptionsAPIProps, useAPIOptions, useSchemaItems } from '@yimoko/store';
import { useMemo, useState } from 'react';

import { handleClick } from '../tools/handle-click';

export type CollapseProps = TCollapseProps & IOptionsAPIProps<keyof CollapseItemProps | 'desc' | 'url' | 'click' | 'value'> & {
  onChange?: (value: any, e?: ITouchEvent) => void;
  skeleton?: Omit<SkeletonProps, 'loading' | 'children'>
};

const defaultKeys = {
  children: 'desc', name: 'name', title: 'title', value: 'value', icon: 'icon', label: 'label',
  disabled: 'disabled', clickable: 'clickable', border: 'border', isLink: 'isLink', size: 'size',
};

export const Collapse = (props: CollapseProps) => {
  const { value, options, api, keys, splitter, valueType, onChange, children, skeleton, accordion, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter);
  const [val, setVal] = useState<CollapseProps['value']>();
  const curItems = useSchemaItems();

  const isControlled = value !== undefined;
  const curValue = useMemo(() => {
    const tmp = !isControlled ? val : value;

    const single = () => `${(Array.isArray(tmp) ? tmp[0] : tmp) ?? ''}`;

    const multiple = () => {
      if (!tmp) {
        return [];
      }
      return Array.isArray(tmp) ? tmp : [tmp];
    };
    return accordion ? single() : multiple();
  }, [accordion, isControlled, val, value]);

  const dataChildren = useMemo(
    () => data?.map((item, i) => (
      <CollapseItem key={`data-${i}`} name={`data-${i}`} {...item} onClick={() => handleClick(item)} />
    )),
    [data],
  );

  // eslint-disable-next-line complexity
  const itemChildren = useMemo(() => curItems.map?.((item, i) => {
    const { 'x-component': component, 'x-decorator': decorator, 'x-decorator-props': itemProps, ...args } = item;
    if (component === 'CollapseItem') {
      const cProps = args['x-component-props'];
      return (
        <CollapseItem key={`item-${i}`} name={`item-${i}`} {...cProps} >
          {args.properties ? <RecursionField schema={item} name={i} onlyRenderProperties /> : cProps.children}
        </CollapseItem>
      );
    }

    return (
      <CollapseItem key={`item-${i}`} name={`item-${i}`} {...((!decorator || decorator === 'CollapseItem') ? itemProps : {})} >
        <RecursionField schema={{ ...args, 'x-component': component }} name={i} />
      </CollapseItem>
    );
  }), [curItems]);

  return (
    <Skeleton {...skeleton} loading={loading}>
      <TCollapse
        {...args}
        accordion={accordion}
        value={curValue}
        onChange={(e) => {
          onChange?.(e.detail);
          !isControlled && setVal(e.detail);
        }}
      >
        {dataChildren}
        {itemChildren}
      </TCollapse>
    </Skeleton>
  );
};
