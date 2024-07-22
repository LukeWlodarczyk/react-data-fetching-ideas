import {  lazy, Suspense } from "react";
import "./styles.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import {
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query';

// import Loader from './ui/Loader/Loader'

import Navigation from './ui/Navigation/'
import AppHeading from './ui/AppHeading'
import Home from './Home'

// import BooksStandard from "./books/BooksStandard/BooksStandard";
import BooksUseSWR from "./books/BooksUseSWR";
import BooksUseQuery from "./books/BooksUseQuery";
import BooksResourceSuspene from "./books/BooksResourceSuspene";
// import BooksUseSWRSuspense from "./books/BooksUseSWRSuspense";
// import BooksUseSuspenseQuery from "./books/BooksUseSuspenseQuery";
import BooksUse from "./books/BooksUse";

const BooksStandard = lazy(() => import('./books/BooksStandard/BooksStandard'));

// const queryClient = new QueryClient();

const HOME_ROUTES = [
  {
    path: '/',
    name: 'Home',
    element: <Home />
  },
]

const NAV_ROUTES = [
  {
    path: '/no-lib-1',
    name: 'No library #1',
    element: <BooksStandard />
  },
  {
    path: '/no-lib-2',
    name: 'No library #2',
    element: <BooksStandard />
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
    element: <BooksStandard />
  },
  {
    path: '/tanstack-query-suspense',
    name: 'TanStack Query Suspense',
    element: <BooksStandard />
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
          <AppHeading>Data fetching ideas</AppHeading>
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
