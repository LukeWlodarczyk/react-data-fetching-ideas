import useSWR from 'swr';

import BooksListStates from '@/ui/BooksListStates';

import { fetchBooksByTitle } from '@/api/books';

const swrConfig = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const BooksListSuspendable = ({ title }) => {
  const { data: books } = useSWR(title, fetchBooksByTitle, {
    ...swrConfig,
    suspense: true,
  });

  const hasBooks = books.length > 0;

  return hasBooks ? (
    <BooksListStates.Success books={books} />
  ) : (
    <BooksListStates.Empty />
  );
};

export default BooksListSuspendable;
