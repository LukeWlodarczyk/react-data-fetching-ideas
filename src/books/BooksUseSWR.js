import useSWR from 'swr'

import Loader from "../Loader";
import ErrorMessage from '../ErrorMessage';

import { fetchBooks } from "../api/books";

const Books = () => {
  const { data: books, isLoading, error } = useSWR('/api/books', fetchBooks);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
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
