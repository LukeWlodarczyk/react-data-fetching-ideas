import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Page from '@/ui/Page';
import BooksListStates from '@/ui/BooksListStates';
import { BasicInput } from '@/ui/SearchInput';

import BooksListSuspendable from './BooksListSuspendable';

import useTitle from '@/hooks/useTitle';

import memoize from '@/api/memoize';
import { fetchBooksByTitle } from '@/api/books';

const mFetchBooksByTitle = memoize(fetchBooksByTitle);

const Books = () => {
  const { title, paramTitle, onChange } = useTitle();
  const hasTitle = Boolean(paramTitle.trim());

  return (
    <Page>
      <BasicInput value={title} onChange={onChange} />
      {!hasTitle && <BooksListStates.EmptyTitle />}
      {hasTitle && (
        <ErrorBoundary FallbackComponent={BooksListStates.Error}>
          <Suspense fallback={<BooksListStates.Loading />}>
            <BooksListSuspendable suspender={mFetchBooksByTitle(paramTitle)} />
          </Suspense>
        </ErrorBoundary>
      )}
    </Page>
  );
};

export default Books;
