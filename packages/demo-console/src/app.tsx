import { createSchemaField } from '@formily/react';
import { APIExecutorProvider, ConfigProvider, SchemaFieldProvider, SchemaComponentsProvider } from '@yimoko/store';
import { http, httpRequest } from '@yimoko/web';
import { BrowserRouter } from 'react-router-dom';

import { componentsMap } from './components';
import { Routes } from './routes';

const SchemaField = createSchemaField({ components: componentsMap });

http.defaults.baseURL = 'http://localhost:3721';

export const App = () => (
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
);
