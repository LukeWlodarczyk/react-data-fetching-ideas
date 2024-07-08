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

// import BooksStandard from "./books/BooksStandard/BooksStandard";
// import BooksUseSWR from "./books/BooksUseSWR";
// import BooksUseQuery from "./books/BooksUseQuery";
// import BooksWrapPromiseSuspense from "./books/BooksWrapPromiseSuspense";
// import BooksUseSWRSuspense from "./books/BooksUseSWRSuspense";
// import BooksUseSuspenseQuery from "./books/BooksUseSuspenseQuery";
// import BooksSuspenseUse from "./books/BooksSuspenseUse";

const BooksStandard = lazy(() => import('./books/BooksStandard/BooksStandard'));

// const queryClient = new QueryClient();

const MAIN_ROUTES = [
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
    element: <BooksStandard />
  },
  {
    path: '/tanstack-query',
    name: 'TanStack Query',
    element: <BooksStandard />
  },
  {
    path: '/custom-suspense',
    name: 'Custom Suspense',
    element: <BooksStandard />
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
    element: <BooksStandard />
  },
]

export default function App() {
  return (
    <Router>
      <div>
        <AppHeading>Data fetching ideas</AppHeading>
        <Navigation links={MAIN_ROUTES} />
        
        <Routes>
          {MAIN_ROUTES.map(route => <Route key={route.path} path={route.path} element={route.element} />)}

          {/* <div style={{ minHeight: 90 }}>
            <h2>useSWR</h2>
            <BooksUseSWR />
          </div> */}
          
          {/* <div style={{ minHeight: 90 }}>
            <QueryClientProvider client={queryClient}>
                <h2>useQuery</h2>
                <BooksUseQuery />
            </QueryClientProvider>
          </div> */}

          {/* <div style={{ minHeight: 90 }}>
            <h2>CustomWrapPromise&Suspense</h2>
            <Suspense fallback={<Loader/ >}>
              <BooksWrapPromiseSuspense />
            </Suspense>
          </div> */}

          {/* <div style={{ minHeight: 90 }}>
            <h2>useSWR&Suspense</h2>
            <Suspense fallback={<Loader/ >}>
              <BooksUseSWRSuspense />
            </Suspense>
          </div> */}

          {/* <div style={{ minHeight: 90 }}>
            <QueryClientProvider client={queryClient}>
                <h2>useSuspenseQuery&Suspense</h2>
                <Suspense fallback={<Loader/ >}>
                  <BooksUseSuspenseQuery />
                </Suspense>
            </QueryClientProvider>
          </div> */}
          
          {/* <div style={{ minHeight: 90 }}>
            <h2>Use&Suspense</h2>
            <Suspense fallback={<Loader/ >}>
              <BooksSuspenseUse />
            </Suspense>
          </div> */}
        </Routes>
      </div>
    </Router>
  );
}
