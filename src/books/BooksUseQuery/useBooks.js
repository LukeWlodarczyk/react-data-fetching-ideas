import { useQuery } from '@tanstack/react-query';

import useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';

import { fetchBooksByTitle } from '@/api/books';

const useBooks = () => {
  const { input, param } = useInputWithDebouncedParam({
    paramName: 'title',
  });

  const {
    data: books,
    isFetched,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [param.value],
    queryFn: () => fetchBooksByTitle(param.value),
    enabled: param.hasValue,
  });

  const isSuccess = Boolean(isFetched && books && books.length);
  const isEmptySuccess = Boolean(isFetched && books && !books.length);

  return {
    books,
    isLoading,
    isSuccess,
    isEmptySuccess,
    isEmptyTitle: !param.hasValue,
    isApiError: isError,
    refetch,
    input,
  };
};

export default useBooks;
