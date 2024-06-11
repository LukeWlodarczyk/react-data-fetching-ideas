import { Suspense } from "react";
import "./styles.css";

import BooksStandard from "./books/BooksStandard";
import BooksUseSWR from "./books/BooksUseSWR";
import BooksWrapPromiseSuspense from "./books/BooksWrapPromiseSuspense";
import BooksUseSWRSuspense from "./books/BooksUseSWRSuspense";

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
          <Suspense fallback={<p>Loading books...</p>}>
            <BooksWrapPromiseSuspense />
          </Suspense>
        </div>

        <div style={{ minHeight: 90 }}>
          <h2>useSWR&Suspense</h2>
          <Suspense fallback={<p>Loading books...</p>}>
            <BooksUseSWRSuspense />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
