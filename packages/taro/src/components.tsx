import { Button, Cell, GridItem, Image } from '@antmjs/vantui';
import { SwiperItem } from '@tarojs/components';
import { withValueChildren } from '@yimoko/store';

import { Form } from './in/form';
import { FormItem } from './in/form-item';
import { Input } from './in/input';
import { CellGroup } from './out/cell-group';
import { Grid } from './out/grid';
import { Icon } from './out/icon';
import { Swiper } from './out/swiper';

export const components: Record<string, any> = {
  // in
  Input,
  Form,
  FormItem,
  // out
  CellGroup,
  Cell,
  Icon,
  Swiper,
  SwiperItem,
  Grid,
  GridItem: withValueChildren(GridItem),
  Button: withValueChildren(Button),
  Image,
};
