import { NoticeBar as TNoticeBar } from '@antmjs/vantui';
import { connect, mapProps } from '@formily/react';

export const NoticeBar = connect(TNoticeBar, mapProps({ value: 'text' }));
