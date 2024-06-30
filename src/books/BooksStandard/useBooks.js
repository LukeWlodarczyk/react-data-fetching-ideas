import { useState, useCallback } from "react";
import _debounce from 'lodash/debounce';

import useBooksApi from './useBooksApi';
import { BOOKS_NOT_FOUND_CODE } from "../../api/books";

const useBooks = () => {
  const [title, setTitle] = useState('the lord of the rings');

  const { books, isLoading, error, getBooksByTitle, clearBooks } = useBooksApi(title);

  const debouncedGetBooksByTitle = useCallback(_debounce(getBooksByTitle, 300), []);

  const onChangeTitle = e => {
    const { value } = e.target
    setTitle(value);

    if (value.trim().length !== 0) {
      debouncedGetBooksByTitle(value);
    } else {
      debouncedGetBooksByTitle.cancel();
      clearBooks();
    }
  };

  const isBooksError = error && error.status === 404 && error.code === BOOKS_NOT_FOUND_CODE;
  const isApiError = !isBooksError && Boolean(error);

  return { 
    books, 
    isLoading, 
    isApiError,
    isBooksError,
    hasBooks: Boolean(books.length),
    title, 
    onChangeTitle 
  };
}

export default useBooks;