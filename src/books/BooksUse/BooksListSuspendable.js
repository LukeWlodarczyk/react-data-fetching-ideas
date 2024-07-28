import { use } from "react";
import _memoize from 'lodash/memoize';

import BooksListStates from "../../ui/BooksListStates";

import { fetchBooksByTitle } from "../../api/books";

const mFetchBooksByTitle = _memoize(fetchBooksByTitle);

const BooksListSuspendable = ({ title }) => {
  let books = [];

  if (title.trim()) books = use(mFetchBooksByTitle(title));

  const hasBooks = books.length > 0;

  return (
    hasBooks 
      ? <BooksListStates.Success books={books} />  
      : <BooksListStates.Empty />
    )
};

export default BooksListSuspendable;
