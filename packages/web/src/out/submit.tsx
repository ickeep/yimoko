import { Submit as TSubmit, ISubmitProps } from '@formily/antd';
import { observer } from '@formily/reactive-react';
import { IStore, useCurForm, useCurStore } from '@yimoko/store';
import { useMemo } from 'react';

export interface SubmitProps extends ISubmitProps {
  store?: IStore
}

export const Submit = observer((props: SubmitProps) => {
  const { store, disabled, children = '提交', loading, ...rest } = props;
  const curStore = useCurStore(store);
  const curForm = useCurForm(undefined, curStore);
  const curLoading = useMemo(() => loading ?? curStore?.loading, [loading, curStore?.loading]);
  const curDisabled = useMemo(() => {
    if (disabled !== undefined) {
      return disabled;
    }
    if (!curForm) {
      return undefined;
    }
    return curForm?.errors?.length > 0;
  }, [disabled, curForm]);

  return <TSubmit  {...rest} children={children} loading={curLoading} disabled={curDisabled} />;
});
