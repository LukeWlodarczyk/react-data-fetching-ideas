import { use } from "react";
import _memoize from 'lodash/memoize';

import BooksList from '../../ui//BooksList';

import { fetchBooksByTitle } from "../../api/books";

const mFetchBooksByTitle = _memoize(fetchBooksByTitle);

const BooksListSuspendable = ({ title }) => {
  let books = [];

  if (title.trim()) {
    books = use(mFetchBooksByTitle(title));
  }

  return <BooksList books={books} />;
};

export default BooksListSuspendable;
