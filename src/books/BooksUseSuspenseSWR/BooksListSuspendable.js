import useSWR from 'swr'

import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import BooksList from '../../ui//BooksList';

import { fetchBooksByTitle } from "../../api/books";

const swrConfig = { 
  revalidateIfStale: false, 
  revalidateOnFocus: false, 
  revalidateOnReconnect: false,
};

const BooksListSuspendable = ({ title }) => {
  const { data: books } = useSWR(
    title, 
    fetchBooksByTitle, 
    { ...swrConfig, suspense: true }
  );

  const hasBooks = books.length > 0;

  return (
    hasBooks 
      ? <BooksList books={books} />  
      : <ErrorMessage message={`Books not found for provided title - ${title}`} />
    )
};

export default BooksListSuspendable;
