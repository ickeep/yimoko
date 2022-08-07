import { SwiperItem } from '@tarojs/components';

import { Button } from './base/button';
import { Cell, CellGroup } from './base/cell';
import { Icon } from './base/icon';
import { Image } from './base/image';
import { Col, Row } from './base/layout';
import { Popup } from './base/popup';
import { Checkbox, CheckboxGroup } from './in/checkbox';
import { Form } from './in/form';
import { FormItem } from './in/form-item';
import { Input } from './in/input';
import { Radio, RadioGroup } from './in/radio';
import { Grid } from './out/grid';
import { Swiper } from './out/swiper';

export const components: Record<string, any> = {
  // in
  Input,
  Form,
  FormItem,

  // base
  Button,
  Cell,
  CellGroup,
  Icon,
  Image,
  Row,
  Col,
  Popup,

  // in
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,

  // out
  Swiper,
  SwiperItem,
  Grid,
};
