import { Button } from '@antmjs/vantui';
import { withValueChildren } from '@yimoko/store';

import { Input } from './in/input';
import { Icon } from './out/icon';

export const components: Record<string, any> = {
  // in
  Input,
  Icon,

  Button: withValueChildren(Button),
};
