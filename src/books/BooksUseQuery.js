import { useQuery } from '@tanstack/react-query';

import Loader from "../Loader";

import { fetchBooks } from "../api/books";

const Books = () => {
  const { data: books, isPending: isLoading } = useQuery({ queryKey: ['/api/books'], queryFn: fetchBooks });

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
