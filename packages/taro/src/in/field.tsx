import { Field as TField } from '@antmjs/vantui';
import { FieldProps as TFieldProps } from '@antmjs/vantui/types/field';
import { isVoidField } from '@formily/core';
import { connect, mapProps } from '@formily/react';
import { ITouchEvent } from '@tarojs/components';
import { FC } from 'react';

export type FieldProps = Omit<TFieldProps, 'onChange' | 'value'> & {
  value?: any,
  onChange?: (value: any, e: ITouchEvent) => void
};

// @ts-ignore
export const Field: FC<FieldProps> = connect(
  TField,
  mapProps((props: FieldProps, field) => {
    const { onChange, required, renderInput, children, ...args } = props;
    const curProps: TFieldProps = args;

    curProps.onChange = e => onChange?.(e.detail, e);

    const runRenderInput = () => {
      if (isVoidField(field) || (Array.isArray(field?.decorator) && field.decorator.includes('Field'))) {
        curProps.renderInput = props.children;
      }
    };
    runRenderInput();

    if (isVoidField(field)) {
      return curProps;
    }

    curProps.required = required ?? field?.required;
    curProps.errorMessage = args.errorMessage ?? field?.selfErrors?.join(',');

    return curProps;
  }),
);
