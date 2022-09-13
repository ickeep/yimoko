import { DropdownItem as TDropdownItem, DropdownMenu as TDropdownMenu } from '@antmjs/vantui';
import { DropdownItemProps as TDropdownItemProps, DropdownMenuProps } from '@antmjs/vantui/types/dropdown-menu';
import { GeneralField, isVoidField } from '@formily/core';
import { observer, useExpressionScope, useField, useForm } from '@formily/react';
import { getItemPropsBySchema, IOptionsAPIProps, useAPIOptions, useSchemaItems } from '@yimoko/store';
import { useMemo } from 'react';

import { templateConvertForProps } from '../tools/template';

const defaultKeys = {
  value: 'value',
  label: 'label',
  icon: 'icon',
  url: 'url',
  click: 'click',
};

export type DropdownItemProps = Omit<TDropdownItemProps, 'options'> & IOptionsAPIProps<keyof typeof defaultKeys>;

export const DropdownItem = observer((props: DropdownItemProps) => {
  const { className, options, api, keys, splitter, ...args } = props;
  const curKeys = useMemo(() => {
    const { label, ...args } = { ...defaultKeys, ...keys };
    return { text: label, ...args };
  }, [keys]);
  const [data] = useAPIOptions(options, api, curKeys, splitter);

  return <TDropdownItem options={data} {...args} />;
});

export const DropdownMenu = observer((props: DropdownMenuProps & { values: Record<string, any> }) => {
  const curItems = useSchemaItems();
  const scope = useExpressionScope();
  const form = useForm();
  const field = useField();

  const valueField = useMemo(() => {
    const getValues: any = (f: GeneralField) => {
      if (!f) {
        return undefined;
      }
      if (isVoidField(f) || f.value === undefined) {
        return getValues(f.parent);
      }
      return f;
    };
    return getValues(field);
  }, [field]);

  const curChildren = useMemo(() => curItems.map?.((item, i) => {
    const props = templateConvertForProps(getItemPropsBySchema(item, 'DropdownItem', i), scope);
    const { name, type } = item;
    if (type !== 'void' && name && valueField) {
      const { value, path } = valueField;
      props.value = value?.[name];
      props.onChange = (v: any) => {
        form.setValuesIn(`${path}.${name}`, v);
      };
    }
    return <DropdownItem key={`i-${i}`} {...props} />;
  }), [curItems, form, scope, valueField]);

  return (<TDropdownMenu {...props} >{curChildren}</TDropdownMenu>);
});
