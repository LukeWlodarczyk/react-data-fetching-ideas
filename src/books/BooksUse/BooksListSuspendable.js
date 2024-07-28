import { use } from "react";
import memoize from '@/api/memoize';

import BooksListStates from "@/ui/BooksListStates";

import { fetchBooksByTitle } from "@/api/books";

const mFetchBooksByTitle = memoize(fetchBooksByTitle, title => title);

const BooksListSuspendable = ({ title }) => {
  const books = use(mFetchBooksByTitle(title));

  const hasBooks = books.length > 0;

  return (
    hasBooks 
      ? <BooksListStates.Success books={books} />  
      : <BooksListStates.Empty />
    )
};

export default BooksListSuspendable;
