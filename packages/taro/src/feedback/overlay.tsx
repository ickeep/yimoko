import { Overlay as TOverlay, Button } from '@antmjs/vantui';
import { ButtonProps } from '@antmjs/vantui/types/button';
import { OverlayProps as TOverlayProps } from '@antmjs/vantui/types/overlay';
import { useFieldSchema, RecursionField } from '@formily/react';
import { ITouchEvent, View } from '@tarojs/components';
import { useSchemaChildren } from '@yimoko/store';
import cls from 'classnames';
import { useState, useMemo, CSSProperties } from 'react';


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

  const fieldSchema = useFieldSchema();
  const { name, additionalProperties } = fieldSchema ?? {};

  const triggerChildren = useMemo(() => {
    // 受控模式，不展示 trigger
    if (isControlled) {
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
  }, [additionalProperties, button, isControlled, name, onChange, triggerStyle, values?.true]);

  const curChildren = useSchemaChildren(children);

  return (
    <>
      <TOverlay
        {...args}
        className={cls(className, 'y-overlay', { [`y-overlay--${contentAlign}`]: contentAlign })}
        show={curValue} onClick={(e) => {
          setShow(false);
          if (isControlled) {
            onChange?.(values?.false ?? false, e);
          }
        }}>
        {curChildren && <View className='c-overlay-center' onClick={e => e?.stopPropagation()}>{curChildren}</View>}
      </TOverlay>
      {triggerChildren}
    </>
  );
};
