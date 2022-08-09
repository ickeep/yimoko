import { Overlay as TOverlay, Button } from '@antmjs/vantui';
import { ButtonProps } from '@antmjs/vantui/types/button';
import { OverlayProps as TOverlayProps } from '@antmjs/vantui/types/overlay';
import { useFieldSchema, RecursionField } from '@formily/react';
import { ITouchEvent } from '@tarojs/components';
import cls from 'classnames';
import { useState, useMemo, CSSProperties } from 'react';

import { View } from '../base/view';

export interface OverlayProps extends TOverlayProps {
  value?: any;
  values?: { true: any, false: any };
  onChange?: (value: any, e: ITouchEvent) => void;
  button?: ButtonProps
  triggerStyle?: CSSProperties
  contentStyle?: CSSProperties
  contentAlign?: 'start' | 'center' | 'end'
}

export const Overlay = (props: OverlayProps) => {
  const { value, values, onChange, button, triggerStyle, children, className, contentAlign, ...args } = props;
  const [show, setShow] = useState(false);

  const curValue = useMemo(() => {
    if (value === undefined) {
      return show;
    }
    if (values) {
      return value === values.true;
    }
    return !!value;
  }, [show, value, values]);

  const fieldSchema = useFieldSchema();
  const { name, additionalProperties, properties } = fieldSchema ?? {};

  const triggerChildren = useMemo(() => {
    // 受控模式，不展示 trigger
    if (value !== undefined) {
      return null;
    }

    const click = (e: ITouchEvent) => {
      setShow(true);
      onChange?.(values?.true ?? true, e);
    };

    if (!additionalProperties) {
      return <Button onClick={click}  {...button} />;
    }
    return (
      <View style={{ display: 'inline-block', ...triggerStyle }} onClick={click}>
        <RecursionField schema={additionalProperties} name={name} />
      </View>
    );
  }, [additionalProperties, button, name, onChange, triggerStyle, value, values?.true]);

  const curChildren = useMemo(() => {
    if (value === undefined) {
      return children;
    }
    if (properties) {
      return <RecursionField schema={{ ...fieldSchema, 'x-component': undefined, 'x-decorator': undefined }} />;
    }
    return children;
  }, [children, fieldSchema, properties, value]);

  return (
    <>
      <TOverlay
        {...args}
        className={cls(className, 'y-overlay', { [`y-overlay-center--${contentAlign}`]: contentAlign })}
        show={curValue} onClick={(e) => {
          setShow(false);
          if (value !== undefined) {
            onChange?.(values?.false ?? false, e);
          }
        }}>
        {curChildren && <View onClick={e => e?.stopPropagation()}>{curChildren}</View>}
      </TOverlay>
      {triggerChildren}
    </>
  );
};
