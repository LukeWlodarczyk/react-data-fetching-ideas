import useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';

import useBooksApi from './useBooksApi';

const useBooks = () => {
  const { input, param } = useInputWithDebouncedParam({ paramName: 'title' });

  const { data, isLoading, isSuccess, error, refetch } = useBooksApi(
    param.value,
    {
      enable: param.hasValue,
    }
  );

  const isApiError = Boolean(error);
  const hasBooks = Boolean(data?.length);

  return {
    books: data,
    isLoading,
    isSuccess: isSuccess && hasBooks,
    isEmptySuccess: isSuccess && !hasBooks,
    isEmptyTitle: !param.hasValue,
    isApiError,
    input,
    refetch: () => refetch(param.value),
  };
};

export default useBooks;
