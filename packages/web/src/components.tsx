import {
  FormLayout, FormItem, FormGrid, FormButtonGroup, Space,
  Submit, Reset, Cascader, Checkbox, DatePicker, Input, NumberPicker,
  Password, Radio, Switch, TimePicker, Transfer, TreeSelect, Upload,
  ArrayCards, ArrayItems, ArrayTable, ArrayTabs, Editable, FormCollapse,
  FormDialog, FormDrawer, FormStep, FormTab, PreviewText,
} from '@formily/antd';

import { Layout, Typography } from 'antd';

import { Select } from './in/select';
import { Icon } from './out/icon';
import { SchemaBox } from './schema/box';
import { SchemaPage } from './schema/page';
import { StorePage } from './store/page';

const { Header, Footer, Sider, Content } = Layout;
const { Title, Text, Link, Paragraph } = Typography;

export const components: Record<string, any> = {
  Select,

  Icon,

  SchemaBox,

  SchemaPage,

  StorePage,
  // antd 组件
  Layout,
  Header,
  Footer,
  Sider,
  Content,

  Title,
  Text,
  Link,
  Paragraph,

  // @formily/antd 插件
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
