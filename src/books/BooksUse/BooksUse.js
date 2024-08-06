import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Page from '@/ui/Page';
import BooksListStates from '@/ui/BooksListStates';
import { BasicInput } from '@/ui/SearchInput';

import SuspendableResource from './SuspendableResource';

import useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';

import memoize from '@/api/memoize';
import { fetchBooksByTitle } from '@/api/books';

const mFetchBooksByTitle = memoize(fetchBooksByTitle);

const Books = () => {
  const { input, param } = useInputWithDebouncedParam({
    paramName: 'title',
  });

  return (
    <Page>
      <BasicInput autoFocus value={input.value} onChange={input.onChange} />
      {!param.hasValue && <BooksListStates.EmptyTitle />}
      {param.hasValue && (
        <ErrorBoundary
          FallbackComponent={({ resetErrorBoundary }) => (
            <BooksListStates.Error onRetry={resetErrorBoundary} />
          )}
          resetKeys={[param.value]}
        >
          <Suspense fallback={<BooksListStates.Loading />}>
            <SuspendableResource suspender={mFetchBooksByTitle(param.value)}>
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
