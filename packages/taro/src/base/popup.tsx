import { Popup as TPopup } from '@antmjs/vantui';
import { connect, mapProps } from '@formily/react';

export const Popup = connect(TPopup, mapProps({ value: 'show' }));
