
import { useRoutes } from 'react-router-dom';

import { IndexPage } from './page';
import { LayoutPage } from './page/layout';
import { StorePageDemo } from './page/store/page';
import { StorePageList } from './page/store/page-list';

export const Routes = () => useRoutes([
  { path: '', element: <IndexPage /> },
  { path: '/layout', element: <LayoutPage /> },
  { path: '/store/page', element: <StorePageDemo /> },
  { path: '/store/page-list', element: <StorePageList /> },
]);
