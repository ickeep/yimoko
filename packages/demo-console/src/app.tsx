import { createSchemaField } from '@formily/react';
import { ConfigStoreProvider, SchemaFieldProvider, SchemaComponentsProvider } from '@yimoko/store';
import { http, configStore } from '@yimoko/web';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { BrowserRouter } from 'react-router-dom';

import { componentsMap } from './components';
import { Routes } from './routes';

const SchemaField = createSchemaField({ components: componentsMap });

http.defaults.baseURL = 'http://localhost:3721';

export const App = () => (
  <ConfigProvider locale={zhCN}>
    <ConfigStoreProvider value={configStore}>
      <SchemaComponentsProvider value={componentsMap}>
        <SchemaFieldProvider value={SchemaField}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </SchemaFieldProvider>
      </SchemaComponentsProvider>
    </ConfigStoreProvider>
  </ConfigProvider>
);
