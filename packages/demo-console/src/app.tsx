import { createSchemaField } from '@formily/react';
import { APIExecutorProvider, ConfigProvider, SchemaFieldProvider, SchemaComponentsProvider } from '@yimoko/store';
import { http, httpRequest } from '@yimoko/web';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { BrowserRouter } from 'react-router-dom';

import { componentsMap } from './components';
import { Routes } from './routes';

const SchemaField = createSchemaField({ components: componentsMap });

http.defaults.baseURL = 'http://localhost:3721';

export const App = () => (
  <AntdConfigProvider locale={zhCN}>
    <ConfigProvider value={{ static: { icon: '/api/svg/', img: '' } }}>
      <APIExecutorProvider value={httpRequest}>
        <SchemaComponentsProvider value={componentsMap}>
          <SchemaFieldProvider value={SchemaField}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </SchemaFieldProvider>
        </SchemaComponentsProvider>
      </APIExecutorProvider>
    </ConfigProvider >
  </AntdConfigProvider>
);
