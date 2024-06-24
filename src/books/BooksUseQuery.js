import { useQuery } from '@tanstack/react-query';

import Loader from "../Loader";
import ErrorMessage from '../ErrorMessage';

import { fetchBooks } from "../api/books";

const Books = () => {
  const { data: books, isPending: isLoading, isError } = useQuery({ queryKey: ['/api/books'], queryFn: fetchBooks });

  if (isLoading) {
    return <Loader />;
  }

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
