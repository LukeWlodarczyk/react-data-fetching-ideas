import BooksListStates from "../../ui/BooksListStates";

import { fetchBooksData } from "./resource";

const booksResource = fetchBooksData();

const BooksListSuspendable = ({ title, debounce }) => {
  const books = booksResource.read(title, { debounce, cacheEnabled: true });

  const hasBooks = books.length > 0;

  return (
    hasBooks 
      ? <BooksListStates.Success books={books} />  
      : <BooksListStates.Empty />
    )
};

export default BooksListSuspendable;
