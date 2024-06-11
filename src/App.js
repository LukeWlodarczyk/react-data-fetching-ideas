import "./styles.css";

import BooksStandard from "./books/BooksStandard";
import BooksUseSWR from "./books/BooksUseSWR";

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
      </div>
    </div>
  );
}
