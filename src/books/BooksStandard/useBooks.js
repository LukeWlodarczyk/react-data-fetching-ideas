import { useState, useCallback, useRef } from "react";
import _debounce from 'lodash/debounce';

import useBooksApi from './useBooksApi';
import { BOOKS_NOT_FOUND_CODE } from "../../api/books";

const useBooks = () => {
  const [title, setTitle] = useState('the lord of the rings');

  const { books, isLoading, error, getBooksByTitle } = useBooksApi(title);

  const onChangeTitle = e => {
    const { value } = e.target;
    setTitle(value);
    getBooksByTitle(value, { debounce: 400, abortParallel: true });
  };

  const isNoBooksError = error && error.status === 404 && error.code === BOOKS_NOT_FOUND_CODE;
  const isApiError = !isNoBooksError && Boolean(error);

  return { 
    books, 
    showLoader: isLoading, 
    showBooks: !isLoading && !isApiError && !isNoBooksError && Boolean(books.length),
    showNoTitleInfo: !Boolean(title.trim()),
    isApiError,
    isNoBooksError,
    title, 
    onChangeTitle 
  };
}

export default useBooks;