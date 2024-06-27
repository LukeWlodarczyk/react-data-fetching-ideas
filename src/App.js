import { Suspense } from "react";
import "./styles.css";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import Loader from './Loader'

import BooksStandard from "./books/BooksStandard/BooksStandard";
import BooksUseSWR from "./books/BooksUseSWR";
import BooksUseQuery from "./books/BooksUseQuery";
import BooksWrapPromiseSuspense from "./books/BooksWrapPromiseSuspense";
import BooksUseSWRSuspense from "./books/BooksUseSWRSuspense";
import BooksUseSuspenseQuery from "./books/BooksUseSuspenseQuery";
import BooksSuspenseUse from "./books/BooksSuspenseUse";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="App">
      <h1>Data fetching ideas</h1>

      <div>
        <div style={{ minHeight: 90 }}>
          <h2>useState&useEffect</h2>
          <BooksStandard />
        </div>

        <div style={{ minHeight: 90 }}>
          <h2>useSWR</h2>
          <BooksUseSWR />
        </div>

        <div style={{ minHeight: 90 }}>
          <QueryClientProvider client={queryClient}>
              <h2>useQuery</h2>
              <BooksUseQuery />
          </QueryClientProvider>
        </div>

        <div style={{ minHeight: 90 }}>
          <h2>CustomWrapPromise&Suspense</h2>
          <Suspense fallback={<Loader/ >}>
            <BooksWrapPromiseSuspense />
          </Suspense>
        </div>

        <div style={{ minHeight: 90 }}>
          <h2>useSWR&Suspense</h2>
          <Suspense fallback={<Loader/ >}>
            <BooksUseSWRSuspense />
          </Suspense>
        </div>

        <div style={{ minHeight: 90 }}>
          <QueryClientProvider client={queryClient}>
              <h2>useSuspenseQuery&Suspense</h2>
              <Suspense fallback={<Loader/ >}>
                <BooksUseSuspenseQuery />
              </Suspense>
          </QueryClientProvider>
        </div>
        
        <div style={{ minHeight: 90 }}>
          <h2>Use&Suspense</h2>
          <Suspense fallback={<Loader/ >}>
            <BooksSuspenseUse />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
