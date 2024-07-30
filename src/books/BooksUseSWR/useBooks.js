import useSWR from 'swr';

import useTitle from '@/hooks/useTitle';

import { fetchBooksByTitle } from '@/api/books';

const swrConfig = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const useBooks = () => {
  const { title, onChange, paramTitle } = useTitle();
  const {
    data: books,
    isLoading,
    error,
    mutate,
  } = useSWR(paramTitle, fetchBooksByTitle, swrConfig);

  const refetch = () => mutate(undefined, { revalidate: true });

  const isFetched = Boolean(books);
  const hasBooks = Boolean(isFetched && books.length);
  const isNoBooksError = Boolean(isFetched && !books.length);
  const isApiError = Boolean(error) && !isFetched && !isLoading;
  const hasTitle = Boolean(paramTitle.trim());

  return {
    books,
    isLoading,
    isSuccess: hasBooks,
    isEmptyTitle: !hasTitle,
    isApiError,
    isNoBooksError,
    refetch,
    title,
    onChangeTitle: onChange,
  };
};

export default useBooks;
