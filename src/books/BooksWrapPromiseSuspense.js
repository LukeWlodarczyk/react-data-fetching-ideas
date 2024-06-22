import { fetchBooksData } from "../api/books";

const booksResource = fetchBooksData();

const Books = () => {

  const books = booksResource.read();

  return (
    <ul>
      {books.map((book) => (
        <li key={book.slug}>{book.title}</li>
      ))}
    </ul>
  );
};

export default Books;
