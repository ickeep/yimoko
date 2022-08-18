import { Dialog as TDialog, Button } from '@antmjs/vantui';
import { ButtonProps } from '@antmjs/vantui/types/button';
import { DialogProps as TDialogProps } from '@antmjs/vantui/types/dialog';
import { RecursionField, useFieldSchema } from '@formily/react';
import { ITouchEvent, View } from '@tarojs/components';
import { judgeIsEmpty, useChildren } from '@yimoko/store';
import { useMemo, useState } from 'react';

export type DialogProps = TDialogProps & {
  value?: any;
  values?: { true: any, false: any };
  onChange?: (value: any, e: ITouchEvent) => void;
  button?: ButtonProps
  triggerStyle?: React.CSSProperties
};

export const Dialog = (props: DialogProps) => {
  const { value, values, onChange, onCancel, onConfirm, button, message, children, triggerStyle, ...args } = props;
  const [show, setShow] = useState(false);
  const isControlled = value !== undefined;

  const fieldSchema = useFieldSchema();
  const { name, additionalProperties } = fieldSchema ?? {};

  const curValue = useMemo(() => {
    if (!isControlled) {
      return show;
    }
    if (values) {
      return value === values.true;
    }
    return !!value;
  }, [isControlled, show, value, values]);

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
      return <Button onClick={click} children={args.title} {...button} />;
    }
    return (
      <View style={{ display: 'inline-block', ...triggerStyle }} onClick={click}>
        <RecursionField schema={additionalProperties} name={name} />
      </View>
    );
  }, [additionalProperties, args.title, button, isControlled, name, onChange, triggerStyle, values?.true]);

  const curChildren = useChildren(children);

  const curMessage = useMemo(() => {
    if (judgeIsEmpty(message) && judgeIsEmpty(curChildren)) {
      return undefined;
    }
    return <>{message}{curChildren}</>;
  }, [curChildren, message]);

  return (
    <>
      <TDialog
        {...args}
        message={curMessage}
        show={curValue}
        onClose={() => setShow(false)}
        onCancel={(e) => {
          setShow(false);
          onCancel?.(e);
        }}
        onConfirm={(e) => {
          setShow(false);
          onConfirm?.(e);
        }}
      />
      {triggerChildren}
    </>

  );
};
