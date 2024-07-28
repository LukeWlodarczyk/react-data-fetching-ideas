import { useSuspenseQuery } from '@tanstack/react-query'

import BooksListStates from '@/ui/BooksListStates';

import { fetchBooksByTitle } from "@/api/books";

const BooksListSuspendable = ({ title }) => {
  const { data: books } = useSuspenseQuery({
    queryKey: [title], 
    queryFn: () => fetchBooksByTitle(title), 
  });

  const hasBooks = books.length > 0;

  return (
    hasBooks 
      ? <BooksListStates.Success books={books} />  
      : <BooksListStates.Empty />
    )
};

export default BooksListSuspendable;
