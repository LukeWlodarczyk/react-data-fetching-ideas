import { useState, useCallback } from "react";
import _debounce from 'lodash/debounce';

import useBooksApi from './useBooksApi';
import { AUTHOR_NOT_FOUND_CODE, BOOKS_NOT_FOUND_CODE } from "../../api/books";

const useBooks = () => {
  const [author, setAuthor] = useState('platon');

  const { books, isLoading, error, getBooksByAuthor, clearBooks } = useBooksApi(author);

  const debouncedGetBooksByAuthor = useCallback(_debounce(getBooksByAuthor, 300), []);

  const onChangeAuthor = e => {
    const { value } = e.target
    setAuthor(value);

    if (value.trim().length !== 0) {
      debouncedGetBooksByAuthor(value);
    } else {
      debouncedGetBooksByAuthor.cancel();
      clearBooks();
    }
  };

  const isAuthorError = error && error.status === 404 && error.code === AUTHOR_NOT_FOUND_CODE;
  const isBooksError = error && error.status === 404 && BOOKS_NOT_FOUND_CODE;
  const isApiError = !isAuthorError && !isBooksError && Boolean(error);

  return { 
    books, 
    isLoading, 
    isApiError,
    isAuthorError,
    isBooksError,
    hasBooks: Boolean(books.length),
    author, 
    onChangeAuthor 
  };
}

export default useBooks;