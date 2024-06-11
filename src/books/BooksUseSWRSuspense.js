import useSWR from 'swr'

import { fetchBooks } from "../api/books";

const Books = () => {
  // https://swr.vercel.app/docs/suspense
  // React still doesn't recommend using Suspense in data frameworks like SWR. 
  // These APIs may change in the future as the results of our research.
  const { data: books } = useSWR('/api/books', fetchBooks, { suspense: true });

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  );
};

export default Books;
