import { Loading as Tloading } from '@antmjs/vantui';
import { LoadingProps as TLoadingProps } from '@antmjs/vantui/types/loading';

export interface LoadingProps extends TLoadingProps {
  value?: boolean;
  loading?: boolean;
}

export const Loading = ({ value = true, ...args }: LoadingProps) => (value ? <Tloading {...args} /> : null);
