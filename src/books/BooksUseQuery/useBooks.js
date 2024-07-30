import { useQuery } from '@tanstack/react-query';

import useTitle from '@/hooks/useTitle';

import { fetchBooksByTitle } from '@/api/books';

const useBooks = () => {
  const { title, onChange, paramTitle } = useTitle();
  const hasTitle = Boolean(paramTitle.trim());

  const {
    data: books,
    isFetched,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [paramTitle],
    queryFn: () => fetchBooksByTitle(paramTitle),
    enabled: hasTitle,
  });

  const hasBooks = Boolean(isFetched && books && books.length);
  const isNoBooksError = Boolean(isFetched && books && !books.length);

  return {
    books,
    isLoading,
    isSuccess: hasBooks,
    isEmptyTitle: !hasTitle,
    isApiError: isError,
    isNoBooksError,
    refetch,
    title,
    onChangeTitle: onChange,
  };
};

export default useBooks;
