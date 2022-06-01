import { ISize } from '../props';
import { useSchemaInherit } from '../schema/context';

export const useSize = (size?: ISize) => {
  const { size: boxSize } = useSchemaInherit();
  return size ?? boxSize;
};
