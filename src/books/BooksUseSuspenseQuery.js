import { useSuspenseQuery } from '@tanstack/react-query';

import Loader from "../Loader";

import { fetchBooks } from "../api/books";

const Books = () => {
  const { data: books } = useSuspenseQuery({ queryKey: ['/api/books'], queryFn: fetchBooks });

  return (
    <ul>
      {books.map((book) => (
        <li key={book.slug}>{book.title}</li>
      ))}
    </ul>
  );
};

export default Books;
