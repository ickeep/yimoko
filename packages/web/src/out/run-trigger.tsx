import { observer } from '@formily/react';
import { BoxStore, IStore, judgeIsEmpty, judgeIsSuccess, useBoxContent, useCurForm, useCurStore } from '@yimoko/store';
import { ButtonProps } from 'antd';

import { ITriggerRender, Trigger } from './trigger';

export interface RunTriggerProps extends ButtonProps {
  trigger?: ITriggerRender
  store?: IStore
  closeBox?: boolean | 'success' | 'fail'
  isBoxContent?: boolean
}

export const RunTrigger = observer((props: RunTriggerProps) => {
  const { store, closeBox, isBoxContent, ...args } = props;
  const boxStore = useBoxContent();
  const { contentStore } = boxStore;
  const useStore = useCurStore(store);
  const curStore = isBoxContent ? contentStore : useStore;
  const curForm = useCurForm(undefined, curStore);

  const click = () => {
    trigStoreRun(curStore, boxStore, closeBox);
  };

  return (
    <Trigger
      loading={curStore?.loading}
      disabled={!judgeIsEmpty(curForm?.errors)}
      children="确定"
      type='primary'
      {...args}
      onTrig={click}
    />
  );
});

// eslint-disable-next-line complexity
export const trigStoreRun = async (store?: IStore, boxStore?: BoxStore, closeBox: boolean | 'success' | 'fail' = 'success') => {
  const { close } = boxStore ?? {};

  if (store) {
    const res = await store.runAPI();
    if (closeBox === true) {
      close?.();
    }
    if (judgeIsSuccess(res)) {
      closeBox === 'success' && close?.();
    } else {
      closeBox === 'fail' && close?.();
    }
  }
};
