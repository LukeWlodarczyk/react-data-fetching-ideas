import { use } from "react";

import { fetchBooks } from "../api/books";

const booksPromise = fetchBooks();

const Books = () => {

  const booksResource = use(booksPromise);

  return (
    <ul>
      {booksResource.map((book) => (
        <li key={book.slug}>{book.title}</li>
      ))}
    </ul>
  );
};

export default Books;
