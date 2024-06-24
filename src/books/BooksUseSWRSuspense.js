import useSWR from 'swr'

import ErrorMessage from '../ErrorMessage';

import { fetchBooks } from "../api/books";

const Books = () => {
  // https://swr.vercel.app/docs/suspense
  // React still doesn't recommend using Suspense in data frameworks like SWR. 
  // These APIs may change in the future as the results of our research.
  const { data: books, error } = useSWR('/api/books', fetchBooks, { suspense: true });

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
