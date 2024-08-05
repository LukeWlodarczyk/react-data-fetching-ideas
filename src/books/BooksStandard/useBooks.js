import useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';

import useBooksApi from './useBooksApi';

const useBooks = () => {
  const { input, param } = useInputWithDebouncedParam({ paramName: 'title' });

  const { books, isLoading, isDone, error, refetch } = useBooksApi(title);

  const isApiError = Boolean(error);
  const hasBooks = Boolean(books.length);

  return {
    books,
    isLoading,
    isSuccess: !isLoading && !isApiError && hasBooks,
    isEmptyTitle: !param.hasValue,
    isApiError,
    isNoBooksError: isDone && !isApiError && !hasBooks && param.hasValue,
    input,
    refetch: () => refetch(param.value),
  };
};

export default useBooks;
