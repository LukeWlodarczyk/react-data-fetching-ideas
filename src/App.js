import "./styles.css";

import BooksStandard from "./books/BooksStandard";

export default function App() {
  return (
    <div className="App">
      <h1>Data fetching ideas</h1>

      <div>
        <div style={{ minHeight: 90 }}>
          <h2>useState&useEffect</h2>
          <BooksStandard />
        </div>
      </div>
    </div>
  );
}
