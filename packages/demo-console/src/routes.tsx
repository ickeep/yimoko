
import { useRoutes } from 'react-router-dom';

import { IndexPage } from './page';
import { LayoutPage } from './page/layout';

export const Routes = () => useRoutes([
  { path: '', element: <IndexPage /> },
  { path: '/layout', element: <LayoutPage /> },
]);
