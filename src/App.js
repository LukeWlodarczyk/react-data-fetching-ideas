import { lazy } from "react";
import "./styles.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './ui/Navigation';
import AppHeading from './ui/AppHeading';

import Home from './Home';

const BooksStandard = lazy(() => import('./books/BooksStandard/BooksStandard'));
const BooksStandard2 = lazy(() => import('./books/BooksStandard2/BooksStandard'));
const BooksUseSWR = lazy(() => import('./books/BooksUseSWR'));
const BooksUseQuery = lazy(() => import('./books/BooksUseQuery'));
const BooksResourceSuspene = lazy(() => import('./books/BooksResourceSuspene'));
const BooksUseSuspenseSWR = lazy(() => import('./books/BooksUseSuspenseSWR'));
const BooksUseSuspenseQuery = lazy(() => import('./books/BooksUseSuspenseQuery'));
const BooksUse = lazy(() => import('./books/BooksUse'));

const HOME_ROUTES = [
  {
    path: '/',
    name: 'Home',
    element: <Home />
  },
];

const NAV_ROUTES = [
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

export default function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Router>
        <header>
          <AppHeading>React data fetching ideas</AppHeading>
          <Navigation links={NAV_ROUTES} />
        </header>
        <main>
          <Routes>
            {[...HOME_ROUTES, ...NAV_ROUTES].map(route => <Route key={route.path} path={route.path} element={route.element} />)}
          </Routes>
        </main>
      </Router>
    </div>
  );
}
