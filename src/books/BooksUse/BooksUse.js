import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Page from '@/ui/Page';
import BooksListStates from '@/ui/BooksListStates';
import { BasicInput } from '@/ui/SearchInput';

import SuspendableResource from './SuspendableResource';

import useTitle from '@/hooks/useTitle';

import memoize from '@/api/memoize';
import { fetchBooksByTitle } from '@/api/books';

const mFetchBooksByTitle = memoize(fetchBooksByTitle);

const Books = () => {
  const { title, paramTitle, onChange } = useTitle();
  const hasTitle = Boolean(paramTitle.trim());

  return (
    <Page>
      <BasicInput autoFocus value={title} onChange={onChange} />
      {!hasTitle && <BooksListStates.EmptyTitle />}
      {hasTitle && (
        <ErrorBoundary
          FallbackComponent={({ resetErrorBoundary }) => (
            <BooksListStates.Error onRetry={resetErrorBoundary} />
          )}
          resetKeys={[title]}
        >
          <Suspense fallback={<BooksListStates.Loading />}>
            <SuspendableResource suspender={mFetchBooksByTitle(paramTitle)}>
              {(data) =>
                data.length > 0 ? (
                  <BooksListStates.Success books={data} />
                ) : (
                  <BooksListStates.Empty />
                )
              }
            </SuspendableResource>
          </Suspense>
        </ErrorBoundary>
      )}
    </Page>
  );
};

export default Books;
