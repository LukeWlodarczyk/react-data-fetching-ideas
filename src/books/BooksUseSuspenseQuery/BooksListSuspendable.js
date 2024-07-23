import { useSuspenseQuery } from '@tanstack/react-query'

import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import BooksList from '../../ui//BooksList';

import { fetchBooksByTitle } from "../../api/books";

const BooksListSuspendable = ({ title }) => {
  const { data: books } = useSuspenseQuery({
    queryKey: [title], 
    queryFn: () => fetchBooksByTitle(title), 
  });

  const hasBooks = books.length > 0;

  return (
    hasBooks 
      ? <BooksList books={books} />  
      : <ErrorMessage message={`Books not found for provided title - ${title}`} />
    )
};

export default BooksListSuspendable;
