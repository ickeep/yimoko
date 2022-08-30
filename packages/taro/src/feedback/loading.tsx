import { Loading as TLoading } from '@antmjs/vantui';
import { LoadingProps as TLoadingProps } from '@antmjs/vantui/types/loading';

export interface LoadingProps extends TLoadingProps {
  value?: boolean;
  loading?: boolean;
}

export const Loading = ({ value = true, ...args }: LoadingProps) => (value ? <TLoading {...args} /> : null);
