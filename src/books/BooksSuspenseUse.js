import { use } from "react";

import { fetchBooks } from "../api/books";

const booksPromise = fetchBooks();

const Books = () => {

  const booksResource = use(booksPromise);

  return (
    <ul>
      {booksResource.map((book) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  );
};

export default Books;
