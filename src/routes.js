import { lazy } from 'react';

import Home from './Home';
import NotFound from './NotFound';

const lazyWithPreload = (cb) => {
  const Component = lazy(cb);
  Component.preload = cb;
  return Component;
};

const BooksStandard = lazyWithPreload(
  () => import('./modules/BooksStandard/BooksStandard')
);
const BooksStandard2 = lazyWithPreload(
  () => import('./modules/BooksStandard2/BooksStandard')
);
const BooksUseSWR = lazyWithPreload(() => import('./modules/BooksUseSWR'));
const BooksUseQuery = lazyWithPreload(() => import('./modules/BooksUseQuery'));
const BooksResourceSuspene = lazyWithPreload(
  () => import('./modules/BooksResourceSuspene')
);
const BooksUseSuspenseSWR = lazyWithPreload(
  () => import('./modules/BooksUseSuspenseSWR')
);
const BooksUseSuspenseQuery = lazyWithPreload(
  () => import('./modules/BooksUseSuspenseQuery')
);
const BooksUse = lazyWithPreload(() => import('./modules/BooksUse'));

export const BASIC_ROUTES = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
  },
  {
    path: '*',
    name: 'Not Found',
    element: <NotFound />,
  },
];

export const BOOKS_ROUTES = [
  {
    path: '/modules/BooksStandard',
    name: 'No libs #1',
    element: <BooksStandard />,
    preload: BooksStandard.preload,
  },
  {
    path: '/modules/no-lib-2',
    name: 'No libs #2',
    element: <BooksStandard2 />,
    preload: BooksStandard2.preload,
  },
  {
    path: '/modules/swr',
    name: 'SWR',
    element: <BooksUseSWR />,
    preload: BooksUseSWR.preload,
  },
  {
    path: '/modules/tanstack-query',
    name: 'TanStack Query',
    element: <BooksUseQuery />,
    preload: BooksUseQuery.preload,
  },
  {
    path: '/modules/resource-suspense',
    name: 'Resource Suspense',
    element: <BooksResourceSuspene />,
    preload: BooksResourceSuspene.preload,
  },
  {
    path: '/modules/swr-suspense',
    name: 'SWR Suspense',
    element: <BooksUseSuspenseSWR />,
    preload: BooksUseSuspenseSWR.preload,
  },
  {
    path: '/modules/tanstack-query-suspense',
    name: 'TanStack Query Suspense',
    element: <BooksUseSuspenseQuery />,
    preload: BooksUseSuspenseQuery.preload,
  },
  {
    path: '/modules/reac-use',
    name: 'React.use',
    element: <BooksUse />,
    preload: BooksUse.preload,
  },
];

export default [...BASIC_ROUTES, ...BOOKS_ROUTES];
