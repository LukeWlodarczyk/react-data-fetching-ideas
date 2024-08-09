import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Page from '@/ui/Page';
import BooksListStates from '@/ui/BooksListStates';
import { BasicInput } from '@/ui/SearchInput';

import useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';
import { fetchBooksByTitle } from '@/api/books';

import SuspendableResource from './SuspendableResource';

import useSWRErrorBoundaryReset from './useSWRErrorBoundaryReset';

const Books = () => {
  const { input, param } = useInputWithDebouncedParam({
    paramName: 'title',
  });

  const { reset } = useSWRErrorBoundaryReset();

  return (
    <Page>
      <BasicInput autoFocus value={input.value} onChange={input.onChange} />
      <ErrorBoundary
        FallbackComponent={({ resetErrorBoundary }) => (
          <BooksListStates.Error
            onRetry={() => resetErrorBoundary(param.value)}
          />
        )}
        onReset={reset}
        resetKeys={[param.value]}
      >
        <Suspense fallback={<BooksListStates.Loading />}>
          {param.hasValue && (
            <SuspendableResource
              fetcher={fetchBooksByTitle}
              query={param.value}
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
