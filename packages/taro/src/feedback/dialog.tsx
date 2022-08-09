import { Dialog as TDialog, Button } from '@antmjs/vantui';
import { ButtonProps } from '@antmjs/vantui/types/button';
import { DialogProps as TDialogProps } from '@antmjs/vantui/types/dialog';
import { RecursionField, useFieldSchema } from '@formily/react';
import { judgeIsEmpty } from '@yimoko/store';
import { useMemo, useState } from 'react';

import { View } from '../base/view';

export type DialogProps = TDialogProps & {
  button?: ButtonProps
  triggerStyle?: React.CSSProperties
};

export const Dialog = (props: DialogProps) => {
  const { onCancel, onConfirm, button, message, children, triggerStyle, ...args } = props;
  const [show, setShow] = useState(false);

  const { name, additionalProperties } = useFieldSchema() ?? {};

  const triggerChildren = useMemo(() => {
    const click = () => setShow(true);

    if (!additionalProperties) {
      return <Button onClick={click} children={args.title} {...button} />;
    }
    return (
      <View style={{ display: 'inline-block', ...triggerStyle }} onClick={click}>
        <RecursionField schema={additionalProperties} name={name} />
      </View>
    );
  }, [additionalProperties, args.title, button, name, triggerStyle]);

  const curMessage = useMemo(() => {
    if (judgeIsEmpty(message) && judgeIsEmpty(children)) {
      return undefined;
    }
    return <>{message}{children}</>;
  }, [message, children]);

  return (
    <>
      <TDialog
        {...args}
        message={curMessage}
        show={show}
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
