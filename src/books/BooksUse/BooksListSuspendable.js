import { use } from 'react';

import BooksListStates from '@/ui/BooksListStates';

const BooksListSuspendable = ({ suspender }) => {
  const books = use(suspender);

  const hasBooks = books.length > 0;

  return hasBooks ? (
    <BooksListStates.Success books={books} />
  ) : (
    <BooksListStates.Empty />
  );
};

export default BooksListSuspendable;
