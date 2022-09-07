import {
  Form, FormLayout, FormItem, FormGrid, FormButtonGroup, Space,
  Submit, Reset, Cascader, Checkbox, DatePicker, Input, NumberPicker,
  Password, Radio, Switch, TimePicker, Transfer, TreeSelect, Upload,
  ArrayCards, ArrayItems, ArrayTable, ArrayTabs, Editable, FormCollapse,
  FormDialog, FormDrawer, FormStep, FormTab, PreviewText,
} from '@formily/antd';

import { SchemaBox, RedirectValues, RedirectListData, withValueChildren, SchemaPage } from '@yimoko/store';
import { Layout, Typography, Button, Divider, Col, Row, Affix, Pagination } from 'antd';

import { Select } from './in/select';
import { Icon } from './out/icon';
import { Link } from './out/link';
import { PageError } from './out/page-error';
import { Table } from './out/table';
import { StoreForm } from './store/form';
import { StorePage } from './store/page';
import { StorePageContent } from './store/page-content';
import { StoreTable } from './store/table';

const { Header, Footer, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export const components: Record<string, any> = {
  Select,

  Icon,
  Link: withValueChildren(Link),
  PageError,
  Table,

  SchemaPage,

  StoreForm,
  StorePageContent,
  StorePage,
  StoreTable,

  // yimoko/store 组件
  RedirectListData,
  RedirectValues,
  SchemaBox,

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
  Submit,
  Reset,
  Input,
  Password,
  // Select, // 自定义，对其增强了 api options 的支持
  TreeSelect,
  DatePicker,
  TimePicker,
  NumberPicker,
  Transfer,
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
