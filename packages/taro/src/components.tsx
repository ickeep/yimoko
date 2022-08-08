import { SwiperItem } from '@tarojs/components';

import { Button } from './base/button';
import { Cell, CellGroup } from './base/cell';
import { Icon } from './base/icon';
import { Image } from './base/image';
import { Col, Row } from './base/layout';
import { Page } from './base/page';
import { Popup } from './base/popup';
import { Text } from './base/text';
import { View } from './base/view';
import { ActionSheet } from './feedback/action-sheet';
import { Checkbox, CheckboxGroup } from './in/checkbox';
import { Form } from './in/form';
import { FormItem } from './in/form-item';
import { Input } from './in/input';
import { Radio, RadioGroup } from './in/radio';
import { Rate } from './in/rate';
import { Slider } from './in/slider';
import { Stepper } from './in/stepper';
import { Switch } from './in/switch';
import { Divider } from './out/divider';
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
  Page,
  Popup,
  Text,
  View,

  // feedback
  ActionSheet,

  // in
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Rate,
  Slider,
  Stepper,
  Switch,

  // out
  Divider,
  Swiper,
  SwiperItem,
  Grid,


};
