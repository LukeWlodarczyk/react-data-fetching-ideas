import { Suspense } from "react";
import "./styles.css";

import Loader from './Loader'

import BooksStandard from "./books/BooksStandard";
import BooksUseSWR from "./books/BooksUseSWR";
import BooksWrapPromiseSuspense from "./books/BooksWrapPromiseSuspense";
import BooksUseSWRSuspense from "./books/BooksUseSWRSuspense";
import BooksSuspenseUse from "./books/BooksSuspenseUse";

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
          <h2>Suspense&Use</h2>
          <Suspense fallback={<Loader/ >}>
            <BooksSuspenseUse />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
