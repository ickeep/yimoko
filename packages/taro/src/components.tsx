import { CollapseItem, IndexAnchor } from '@antmjs/vantui';
import { observer, useExpressionScope } from '@formily/react';
import {
  Block, CoverView, KeyboardAccessory, MovableArea, MovableView, OfficialAccount, OpenData,
  PageContainer, ScrollView, ShareElement, SwiperItem, View, VoipRoom,
} from '@tarojs/components';

import { DataItems } from '@yimoko/store';

import { Button } from './base/button';
import { Camera } from './base/camera';
import { Cell, CellGroup } from './base/cell';
import { CoverImage } from './base/cover-image';
import { Icon } from './base/icon';
import { Image } from './base/image';
import { Col, Row } from './base/layout';
import { LivePlayer } from './base/live-player';
import { LivePusher } from './base/live-pusher';
import { Map } from './base/map';
import { Page } from './base/page';
import { Popup } from './base/popup';
import { RichText } from './base/rich-text';
import { Text } from './base/text';
import { Transition } from './base/transition';
import { Video } from './base/video';
import { ActionSheet } from './feedback/action-sheet';
import { Dialog } from './feedback/dialog';
import { Loading } from './feedback/loading';
import { Overlay } from './feedback/overlay';
import { Checkbox, CheckboxGroup } from './in/checkbox';
import { Field } from './in/field';
import { Form } from './in/form';
import { Input } from './in/input';
import { Label } from './in/label';
import { Picker } from './in/picker';
import { PickerDate } from './in/picker-date';
import { PickerMulti } from './in/picker-multi';
import { PickerRegion } from './in/picker-region';
import { PickerTime } from './in/picker-time';
import { Radio, RadioGroup } from './in/radio';
import { Rate } from './in/rate';
import { Slider } from './in/slider';
import { Stepper } from './in/stepper';
import { Switch } from './in/switch';
import { Textarea } from './in/textarea';
import { Uploader } from './in/uploader';
import { DropdownItem, DropdownMenu } from './nav/dropdown-menu';
import { Grid } from './nav/grid';
import { IndexBar } from './nav/index-bar';
import { NavBar } from './nav/nav-bar';
import { Navigator } from './nav/navigator';
import { Pagination } from './nav/pagination';
import { Sidebar } from './nav/sidebar';
import { Tab, Tabs } from './nav/tab';
import { Tabbar, TabbarItem } from './nav/tabbar';
import { APIPage } from './out/api-page';
import { Card, CardList } from './out/card';
import { Circle } from './out/circle';
import { Collapse } from './out/collapse';
import { CountDown } from './out/count-down';
import { Divider } from './out/divider';
import { Empty } from './out/empty';
import { MatchMedia } from './out/match-media';
import { NoticeBar } from './out/notice-bar';
import { Progress } from './out/progress';
import { ResponseError } from './out/response-error';
import { Skeleton } from './out/skeleton';
import { Steps } from './out/steps';
import { Sticky } from './out/sticky';
import { Swiper } from './out/swiper';
import { Table } from './out/table';
import { Tag } from './out/tag';
import { ProductsIndex } from './pro/products-index';
import { StorePage } from './store/page';
import { StoreScrollView } from './store/scroll-view';
import { templateConvertForProps } from './tools/template';


export const components: Record<string, any> = {
  // store 组件
  DataItems,

  // 无需适配
  View,
  ScrollView,
  MovableArea,
  MovableView,
  CoverView,
  ShareElement,
  PageContainer,

  Block,

  KeyboardAccessory,

  VoipRoom,

  OfficialAccount,
  OpenData,

  // base
  Button,
  Camera,
  Cell,
  CellGroup,
  CoverImage,
  Icon,
  Image,
  Row,
  Col,
  LivePlayer,
  LivePusher,
  Map,
  Page,
  Popup,
  RichText,
  Text,
  Transition,
  Video,

  // feedback
  ActionSheet,
  Dialog,
  Loading,
  Overlay,

  // in
  Checkbox,
  CheckboxGroup,
  Field,
  Form,
  Input,
  Label,
  Picker,
  PickerDate,
  PickerMulti,
  PickerRegion,
  PickerTime,
  Radio,
  RadioGroup,
  Rate,
  Slider,
  Stepper,
  Switch,
  Textarea,
  Uploader,

  // out
  APIPage,
  Card,
  CardList,
  Circle,
  Collapse,
  CollapseItem,
  CountDown,
  Divider,
  Empty,
  MatchMedia,
  NoticeBar,
  Progress,
  ResponseError,
  Skeleton,
  Steps,
  Sticky,
  Swiper,
  SwiperItem,
  Table,
  Tag,

  // nav
  DropdownMenu,
  DropdownItem,
  Grid,
  IndexBar,
  IndexAnchor,
  NavBar,
  Navigator,
  Pagination,
  Sidebar,
  Tabs,
  Tab,
  Tabbar,
  TabbarItem,

  // pro
  ProductsIndex,

  // store
  StorePage,
  StoreScrollView,

};

// hoc 转换组件 props 使其支持 模版
export function withConvertProps<T extends Object = Record<string, any>>(C: React.ComponentClass<T> | React.FunctionComponent<T>) {
  return observer((props: T) => {
    const scope = useExpressionScope();
    const cProps = templateConvertForProps(props, scope) as T;
    return <C {...cProps} />;
  });
}

export const convertPropsComponents: Record<string, any> = {};

Object.entries(components).forEach(([key, value]) => convertPropsComponents[key] = withConvertProps(value));
