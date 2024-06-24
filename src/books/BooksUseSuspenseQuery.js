import { useSuspenseQuery } from '@tanstack/react-query';

import ErrorMessage from '../ErrorMessage';

import { fetchBooks } from "../api/books";

const Books = () => {
  const { data: books, isError } = useSuspenseQuery({ queryKey: ['/api/books'], queryFn: fetchBooks });

  if (isError) {
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
