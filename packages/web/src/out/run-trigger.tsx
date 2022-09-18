import { Form } from '@formily/core';
import { observer } from '@formily/react';
import { IStore, judgeIsEmpty, judgeIsSuccess, useBox, useCurForm, useCurStore } from '@yimoko/store';
import { ButtonProps } from 'antd';

import { ITriggerRender, Trigger } from './trigger';

export interface RunTriggerProps extends Omit<ButtonProps, 'form'> {
  trigger?: ITriggerRender
  store?: IStore
  closeBox?: boolean | 'success' | 'fail'
  isValidationForm?: boolean
  form?: Form
  isBoxContent?: boolean
  htmlForm?: string
}

export const RunTrigger = observer((props: RunTriggerProps) => {
  const { store, closeBox, isValidationForm = true, isBoxContent, form, htmlForm, ...args } = props;
  const curForm = useCurForm(form);
  const boxStore = useBox();
  const { onClose, contentStore } = boxStore;

  const useStore = useCurStore(store);

  console.log('RunTrigger contentStore', contentStore);

  const curStore = isBoxContent ? contentStore : useStore;

  // eslint-disable-next-line complexity
  const run = async () => {
    if (curStore) {
      const res = await curStore.runAPI();
      if (closeBox === true) {
        onClose?.();
      }
      if (judgeIsSuccess(res)) {
        closeBox === 'success' && onClose?.();
      } else {
        closeBox === 'fail' && onClose?.();
      }
    }
  };

  const click: ButtonProps['onClick'] = () => {
    if (isValidationForm) {
      if (curForm) {
        curForm.submit(() => run());
      } else {
        run();
      }
    } else {
      run();
    }
  };

  return (
    <Trigger
      loading={curStore?.loading}
      disabled={!judgeIsEmpty(curForm?.errors)}
      children="确定"
      type='primary'
      {...args}
      form={htmlForm}
      onTrig={click}
    />
  );
});
