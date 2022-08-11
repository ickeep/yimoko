import { connect, mapProps } from '@formily/react';
import { RichText as TRichText } from '@tarojs/components';

export const RichText = connect(TRichText, mapProps({ value: 'nodes' }));
