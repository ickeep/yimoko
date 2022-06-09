import { APIExecutorProvider } from '@yimoko/store';
import { httpRequest } from '@yimoko/web';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './routes';

// http.defaults.baseURL = 'http://localhost:3721';

export const App = () => (
  <APIExecutorProvider value={httpRequest}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </APIExecutorProvider>
);
