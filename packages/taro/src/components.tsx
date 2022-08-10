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
import { Dialog } from './feedback/dialog';
import { Loading } from './feedback/loading';
import { Overlay } from './feedback/overlay';
import { Checkbox, CheckboxGroup } from './in/checkbox';
import { Form } from './in/form';
import { FormItem } from './in/form-item';
import { Input } from './in/input';
import { Radio, RadioGroup } from './in/radio';
import { Rate } from './in/rate';
import { Slider } from './in/slider';
import { Stepper } from './in/stepper';
import { Switch } from './in/switch';
import { Circle } from './out/circle';
import { CountDown } from './out/count-down';
import { Divider } from './out/divider';
import { Empty } from './out/empty';
import { Grid } from './out/grid';
import { NoticeBar } from './out/notice-bar';
import { Progress } from './out/progress';
import { Swiper } from './out/swiper';
import { Table } from './out/table';

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
  Dialog,
  Loading,
  Overlay,

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
  Circle,
  CountDown,
  Divider,
  Empty,
  NoticeBar,
  Progress,
  Grid,
  Swiper,
  SwiperItem,
  Table,
};
