import useSWR from 'swr'

import Loader from "../Loader";

import { fetchBooks } from "../api/books";

const Books = () => {
  const { data: books, isLoading } = useSWR('/api/books', fetchBooks);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ul>
      {books.map((book) => (
        <li key={book.slug}>{book.title}</li>
      ))}
    </ul>
  );
};

export default Books;
