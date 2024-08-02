import useSWR from 'swr';

import useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';

import { fetchBooksByTitle } from '@/api/books';

const swrConfig = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const useBooks = () => {
  const { input, param } = useInputWithDebouncedParam({ paramName: 'title' });
  const {
    data: books,
    isLoading,
    error,
    mutate,
  } = useSWR(param.value, fetchBooksByTitle, swrConfig);

  const refetch = () => mutate(undefined, { revalidate: true });

  const isFetched = Boolean(books);
  const hasBooks = Boolean(isFetched && books.length);
  const isNoBooksError = Boolean(isFetched && !books.length);
  const isApiError = Boolean(error) && !isFetched && !isLoading;

  return {
    books,
    isLoading,
    isSuccess: hasBooks,
    isEmptyTitle: !param.hasValue,
    isApiError,
    isNoBooksError,
    refetch,
    input,
  };
};

export default useBooks;
