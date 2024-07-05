import { useState } from "react";
import _debounce from 'lodash/debounce';

import useBooksApi from './useBooksApi';
import { BOOKS_NOT_FOUND_CODE } from "../../api/books";

const useBooks = () => {
  const [title, setTitle] = useState('the lord of the rings');

  const { books, isLoading, error, refetch } = useBooksApi(title);

  const onChangeTitle = e => {
    const { value } = e.target;


    refetch(value, { debounce: 400, abortParallel: true });
  };

  const isApiError = Boolean(error);
  const hasTitle = Boolean(title.trim());
  const hasBooks = Boolean(books.length);

  return { 
    books, 
    isLoading, 
    showBooks: !isLoading && !isApiError && hasBooks,
    showNoTitleInfo: !hasTitle,
    isApiError,
    isNoBooksError: !isLoading && !isApiError && !hasBooks && hasTitle,
    title, 
    onChangeTitle 
  };
}

export default useBooks;