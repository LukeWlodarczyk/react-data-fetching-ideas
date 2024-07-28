import { lazy } from 'react';

import Home from './Home';
import NotFound from './NotFound';

const lazyWithPreload = (cb) => {
  const Component = lazy(cb);
  Component.preload = cb;
  return Component;
};

const BooksStandard = lazyWithPreload(
  () => import('./books/BooksStandard/BooksStandard')
);
const BooksStandard2 = lazyWithPreload(
  () => import('./books/BooksStandard2/BooksStandard')
);
const BooksUseSWR = lazyWithPreload(() => import('./books/BooksUseSWR'));
const BooksUseQuery = lazyWithPreload(() => import('./books/BooksUseQuery'));
const BooksResourceSuspene = lazyWithPreload(
  () => import('./books/BooksResourceSuspene')
);
const BooksUseSuspenseSWR = lazyWithPreload(
  () => import('./books/BooksUseSuspenseSWR')
);
const BooksUseSuspenseQuery = lazyWithPreload(
  () => import('./books/BooksUseSuspenseQuery')
);
const BooksUse = lazyWithPreload(() => import('./books/BooksUse'));

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
    path: '/no-lib-1',
    name: 'No libs #1',
    element: <BooksStandard />,
    preload: BooksStandard.preload,
  },
  {
    path: '/no-lib-2',
    name: 'No libs #2',
    element: <BooksStandard2 />,
    preload: BooksStandard2.preload,
  },
  {
    path: '/swr',
    name: 'SWR',
    element: <BooksUseSWR />,
    preload: BooksUseSWR.preload,
  },
  {
    path: '/tanstack-query',
    name: 'TanStack Query',
    element: <BooksUseQuery />,
    preload: BooksUseQuery.preload,
  },
  {
    path: '/resource-suspense',
    name: 'Resource Suspense',
    element: <BooksResourceSuspene />,
    preload: BooksResourceSuspene.preload,
  },
  {
    path: '/swr-suspense',
    name: 'SWR Suspense',
    element: <BooksUseSuspenseSWR />,
    preload: BooksUseSuspenseSWR.preload,
  },
  {
    path: '/tanstack-query-suspense',
    name: 'TanStack Query Suspense',
    element: <BooksUseSuspenseQuery />,
    preload: BooksUseSuspenseQuery.preload,
  },
  {
    path: '/reac-use',
    name: 'React.use',
    element: <BooksUse />,
    preload: BooksUse.preload,
  },
];

export default [...BASIC_ROUTES, ...BOOKS_ROUTES];
