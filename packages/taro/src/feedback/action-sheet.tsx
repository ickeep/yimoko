import { ActionSheet as TActionSheet, Button, Skeleton } from '@antmjs/vantui';
import { ActionSheetItem, ActionSheetProps as TActionSheetProps } from '@antmjs/vantui/types/action-sheet';
import { ButtonProps } from '@antmjs/vantui/types/button';
import { ITouchEvent, View } from '@tarojs/components';
import { IOptionsAPIProps, judgeIsEmpty, useAPIOptions, useChildren } from '@yimoko/store';
import { useMemo, useState } from 'react';

import { handleClick } from '../tools/handle-click';

export type ActionSheetProps = TActionSheetProps & IOptionsAPIProps<keyof ActionSheetItem | 'desc' | 'url' | 'click' | 'value'> & {
  value?: any;
  values?: { true: any, false: any };
  onChange?: (value: any, e?: ITouchEvent) => void;
  button?: ButtonProps
  itemURLPrefix?: string
};

const defaultKeys = {
  name: 'name',
  subname: 'desc',
  color: 'color',
  loading: 'loading',
  disabled: 'disabled',
  url: 'url',
  click: 'click',
  value: 'value',
};

export const ActionSheet = (props: ActionSheetProps) => {
  const { value, values, options, api, keys, splitter, valueType, onChange, onSelect, onCancel, button, children, itemURLPrefix, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter);
  const [show, setShow] = useState(false);

  const isControlled = value !== undefined;

  const curValue = useMemo(() => {
    if (!isControlled) {
      return show;
    }
    if (values) {
      return value === values.true;
    }
    return !!value;
  }, [isControlled, show, value, values]);

  const tempChildren = useChildren(children);

  const curChildren = useMemo(() => {
    // 受控模式，不展示 trigger
    if (isControlled) {
      return null;
    }
    const click = () => setShow(true);
    if (typeof children === 'string') {
      return <Button onClick={click} children={children} {...button} />;
    }
    if (judgeIsEmpty(tempChildren)) {
      return <Button onClick={click} children={args.title} {...button} />;
    }
    return <View onClick={click}>{tempChildren}</View>;
  }, [args.title, button, children, isControlled, tempChildren]);

  const close = (e?: ITouchEvent) => {
    setShow(false);
    onChange?.(values?.false ?? false, e);
  };

  return (
    <Skeleton loading={loading}>
      <TActionSheet
        {...args}
        show={curValue}
        actions={data}
        onClose={close}
        onCancel={() => {
          onCancel?.();
          close();
        }}
        onSelect={(e) => {
          const { detail } = e;
          handleClick(detail, itemURLPrefix);
          close(e);
          onSelect?.(e);
        }}
      >
      </TActionSheet>
      {curChildren}
    </Skeleton>
  );
};
