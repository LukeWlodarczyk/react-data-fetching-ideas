import BooksList from '../../ui//BooksList';

import { fetchBooksData } from "./resource";

const booksResource = fetchBooksData();

const BooksListSuspendable = ({ title, debounce }) => {
  let books = [];

  if (title.trim()) books = booksResource.read(title, { debounce, cacheEnabled: true });

  return <BooksList books={books} />;
};

export default BooksListSuspendable;
