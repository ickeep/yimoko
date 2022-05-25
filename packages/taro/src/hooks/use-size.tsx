import { useFormInherit } from '../in/form';
import { ISize } from '../props';

export const useSize = (size?: ISize) => {
  const { size: formSize } = useFormInherit();
  return size ?? formSize;
};
