import { fetchBooksData } from "../api/books";

const booksResource = fetchBooksData();

const Books = () => {

  const books = booksResource.read();

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  );
};

export default Books;
