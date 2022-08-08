import { ActionSheet as TActionSheet, Button, Skeleton } from '@antmjs/vantui';
import { ActionSheetItem, ActionSheetProps as TActionSheetProps } from '@antmjs/vantui/types/action-sheet';
import { ButtonProps } from '@antmjs/vantui/types/button';
import { ITouchEvent } from '@tarojs/components';
import { IOptionsAPIProps, judgeIsEmpty, useAPIOptions } from '@yimoko/store';
import { useMemo, useState, isValidElement } from 'react';

import { View } from '../base/view';

import { handleClick } from '../tools/handle-click';

export type ActionSheetProps = TActionSheetProps & IOptionsAPIProps<keyof ActionSheetItem | 'desc' | 'url' | 'click' | 'value'> & {
  onChange?: (value: any, event: ITouchEvent & { detail: ActionSheetItem }) => void
  button?: ButtonProps
};

const defaultKeys = { name: 'name', subname: 'desc' };
export const ActionSheet = (props: ActionSheetProps) => {
  const { options, api, keys, splitter, valueType, onChange, onSelect, onCancel, button, children, ...args } = props;
  const [data, loading] = useAPIOptions(options, api, { ...defaultKeys, ...keys }, splitter);
  const [show, setShow] = useState(false);


  const curChildren = useMemo(() => {
    const click = () => setShow(true);
    if (typeof children === 'string') {
      return <Button onClick={click} children={children} {...button} />;
    }
    if (judgeIsEmpty(children) || !isValidElement(children)) {
      return <Button onClick={click} children={args.title} {...button} />;
    }
    return <View onClick={click}>{children}</View>;
  }, [args.title, button, children]);

  return (
    <Skeleton loading={loading}>
      <TActionSheet
        {...args}
        show={show}
        actions={data}
        onClose={() => setShow(false)}
        onCancel={() => {
          onCancel?.();
          setShow(false);
        }}
        onSelect={(e) => {
          const { detail } = e;
          handleClick(detail);
          onChange?.(detail?.value ?? detail.name, e);
          onSelect?.(e);
        }}
      >
      </TActionSheet>
      {curChildren}
    </Skeleton>
  );
};
