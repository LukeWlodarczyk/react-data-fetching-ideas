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
  const isSuccess = Boolean(isFetched && books.length);
  const isEmptySuccess = Boolean(isFetched && !books.length);
  const isApiError = Boolean(error) && !isFetched && !isLoading;

  return {
    books,
    isLoading,
    isSuccess,
    isEmptySuccess,
    isEmptyTitle: !param.hasValue,
    isApiError,
    refetch,
    input,
  };
};

export default useBooks;
