import { APIExecutorProvider } from '@yimoko/store';
import { httpRequest } from '@yimoko/web';
import ReactDOM from 'react-dom/client';

import { App } from './app';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// http.defaults.baseURL = 'http://localhost:3721';
root.render((
  <APIExecutorProvider value={httpRequest}>
    <App />
  </APIExecutorProvider>
));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
