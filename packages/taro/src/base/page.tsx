import { ViewProps } from '@tarojs/components';
import cls from 'classnames';

import { View } from '../base/view';

export const Page = ({ className, ...args }: ViewProps) => <View className={cls('y-page', className)} {...args} />;
