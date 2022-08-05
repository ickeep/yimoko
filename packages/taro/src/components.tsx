import { Button, Image } from '@antmjs/vantui';
import { withValueChildren } from '@yimoko/store';

import { Form } from './in/form';
import { FormItem } from './in/form-item';
import { Input } from './in/input';
import { Icon } from './out/icon';
import { Swiper } from './out/swiper';

export const components: Record<string, any> = {
  // in
  Input,
  Form,
  FormItem,
  // out
  Icon,
  Swiper,
  Button: withValueChildren(Button),
  Image,
};
