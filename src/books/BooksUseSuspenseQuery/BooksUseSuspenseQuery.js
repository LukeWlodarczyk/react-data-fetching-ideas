import { Suspense } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import Page from '@/ui/Page';
import BooksListStates from '@/ui/BooksListStates';
import { BasicInput } from '@/ui/SearchInput';

import { fetchBooksByTitle } from '@/api/books';

import SuspendableResource from './SuspendableResource';

import useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';

const Books = () => {
  const { input, param } = useInputWithDebouncedParam({
    paramName: 'title',
  });

  const { reset } = useQueryErrorResetBoundary();

  return (
    <Page>
      <BasicInput autoFocus value={input.value} onChange={input.onChange} />
      <ErrorBoundary
        FallbackComponent={({ resetErrorBoundary }) => (
          <BooksListStates.Error onRetry={resetErrorBoundary} />
        )}
        onReset={reset}
        resetKeys={[param.value]}
      >
        <Suspense fallback={<BooksListStates.Loading />}>
          {param.hasValue && (
            <SuspendableResource
              query={param.value}
              fetcher={fetchBooksByTitle}
              onSuccess={(data) => <BooksListStates.Success books={data} />}
              onEmpty={() => <BooksListStates.Empty />}
            />
          )}
          {!param.hasValue && <BooksListStates.EmptyTitle />}
        </Suspense>
      </ErrorBoundary>
    </Page>
  );
};

export default Books;
