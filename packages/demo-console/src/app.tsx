import { createSchemaField } from '@formily/react';
import { APIExecutorProvider, SchemaFieldProvider } from '@yimoko/store';
import { http, httpRequest } from '@yimoko/web';
import { BrowserRouter } from 'react-router-dom';

import { componentsMap } from './components';

import { Routes } from './routes';

const SchemaField = createSchemaField({ components: componentsMap });

http.defaults.baseURL = 'http://localhost:3721';

export const App = () => (
  <APIExecutorProvider value={httpRequest}>
    <SchemaFieldProvider value={SchemaField}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </SchemaFieldProvider>
  </APIExecutorProvider>
);
