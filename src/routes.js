import { lazy } from "react";

import Home from './Home';
import NotFound from './NotFound';

const BooksStandard = lazy(() => import('./books/BooksStandard/BooksStandard'));
const BooksStandard2 = lazy(() => import('./books/BooksStandard2/BooksStandard'));
const BooksUseSWR = lazy(() => import('./books/BooksUseSWR'));
const BooksUseQuery = lazy(() => import('./books/BooksUseQuery'));
const BooksResourceSuspene = lazy(() => import('./books/BooksResourceSuspene'));
const BooksUseSuspenseSWR = lazy(() => import('./books/BooksUseSuspenseSWR'));
const BooksUseSuspenseQuery = lazy(() => import('./books/BooksUseSuspenseQuery'));
const BooksUse = lazy(() => import('./books/BooksUse'));

export const BASIC_ROUTES = [
  {
    path: '/',
    name: 'Home',
    element: <Home />
  },
  {
    path: '*',
    name: 'Not Found',
    element: <NotFound />
  },
];

export const BOOKS_ROUTES = [
  {
    path: '/no-lib-1',
    name: 'No libs #1',
    element: <BooksStandard />
  },
  {
    path: '/no-lib-2',
    name: 'No libs #2',
    element: <BooksStandard2 />
  },
  {
    path: '/swr',
    name: 'SWR',
    element: <BooksUseSWR />
  },
  {
    path: '/tanstack-query',
    name: 'TanStack Query',
    element: <BooksUseQuery />
  },
  {
    path: '/resource-suspense',
    name: 'Resource Suspense',
    element: <BooksResourceSuspene />
  },
  {
    path: '/swr-suspense',
    name: 'SWR Suspense',
    element: <BooksUseSuspenseSWR />
  },
  {
    path: '/tanstack-query-suspense',
    name: 'TanStack Query Suspense',
    element: <BooksUseSuspenseQuery />
  },
  {
    path: '/reac-use',
    name: 'React.use',
    element: <BooksUse />
  },
];

export default [...BASIC_ROUTES, ...BOOKS_ROUTES];
