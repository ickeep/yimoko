import {
  Form, FormLayout, FormItem, FormGrid, FormButtonGroup, Space,
  Reset, Cascader, Checkbox, DatePicker, Input, NumberPicker,
  Password, Radio, Switch, TimePicker, TreeSelect, Upload,
  ArrayCards, ArrayItems, ArrayTable, ArrayTabs, Editable, FormCollapse,
  FormDialog, FormDrawer, FormStep, FormTab, PreviewText,
} from '@formily/antd';

import { SchemaBox, RedirectValues, RedirectListData, withValueChildren, SchemaPage, SchemaTemplate, TransformScope } from '@yimoko/store';
import { Layout, Typography, Button, Divider, Col, Row, Affix, Pagination } from 'antd';
import { Key } from 'react';

import { LoadDepend } from './common/load-depend';
import { RemoteComponent } from './common/remote-component';


import { Select } from './in/select';
import { Transfer } from './in/transfer';
import { CancelTrigger } from './out/cancel-trigger';
import { DateOut } from './out/date';
import { DetailLink } from './out/detail-link';
import { Drawer } from './out/drawer';
import { EditLink } from './out/edit-link';
import { Icon } from './out/icon';
import { KeyToVal } from './out/key-to-val';
import { Link } from './out/link';
import { Modal } from './out/modal';
import { OkTrigger } from './out/ok-trigger';
import { PageError } from './out/page-error';
import { RunTrigger } from './out/run-trigger';
import { Submit } from './out/submit';
import { Table } from './out/table';
import { Trigger } from './out/trigger';
import { PageBreadcrumb } from './page/page-breadcrumb';
import { StoreDesc } from './store/desc';
import { StoreForm } from './store/form';
import { StorePage } from './store/page';
import { StorePageContent } from './store/page-content';
import { StoreTable } from './store/table';

const { Header, Footer, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export const components: Record<Key, any> = {
  LoadDepend,
  RemoteComponent,
  // in 组件 自定义，对其增强了 api options 的支持
  Select,
  Transfer,

  // out 组件
  CancelTrigger,
  DateOut,
  DetailLink,
  Drawer,
  EditLink,
  Icon,
  KeyToVal,
  Link,
  Modal,
  OkTrigger,
  PageError,
  RunTrigger,
  Submit,
  Table,
  Trigger,

  // page 组件
  PageBreadcrumb,


  StoreDesc,
  StoreForm,
  StorePageContent,
  StorePage,
  StoreTable,

  // yimoko/store 组件
  SchemaPage,
  RedirectListData,
  RedirectValues,
  SchemaBox,
  SchemaTemplate,
  TransformScope,

  // antd 组件
  Button: withValueChildren(Button),
  Title: withValueChildren(Title),
  Text: withValueChildren(Text),
  Paragraph: withValueChildren(Paragraph),

  Divider: withValueChildren(Divider),
  Row,
  Col: withValueChildren(Col),
  Layout,
  Header: withValueChildren(Header),
  Footer: withValueChildren(Footer),
  Sider: withValueChildren(Sider),
  Content: withValueChildren(Content),

  Affix,
  // Breadcrumb todo 适配
  // Dropdown todo 适配
  // Menu todo 适配
  // PageHeader todo 适配
  Pagination,
  // Steps todo 适配

  // AutoComplete todo 适配


  // @formily/antd 插件
  Form,
  FormLayout,
  FormItem,
  FormGrid,
  FormButtonGroup,
  Space,
  Reset,
  Input,
  Password,
  TreeSelect,
  DatePicker,
  TimePicker,
  NumberPicker,
  Cascader,
  Radio,
  Checkbox,
  Upload,
  Switch,

  ArrayCards,
  ArrayItems,
  ArrayTable,
  ArrayTabs,
  FormCollapse,
  FormStep,
  FormTab,
  FormDialog,
  FormDrawer,
  Editable,

  PreviewText,
};
