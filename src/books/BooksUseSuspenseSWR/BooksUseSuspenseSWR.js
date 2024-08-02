import { Suspense } from 'react';
import { useSWRConfig } from 'swr';
import { ErrorBoundary } from 'react-error-boundary';

import Page from '@/ui/Page';
import BooksListStates from '@/ui/BooksListStates';
import { BasicInput } from '@/ui/SearchInput';

import { fetchBooksByTitle } from '@/api/books';

import SuspendableResource from './SuspendableResource';

import useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';

const ERROR_BOUNDARY_RESET_REASON = {
  KEYS: 'keys',
  IMPERATIVE_API: 'imperative-api',
};

const Books = () => {
  const { input, param } = useInputWithDebouncedParam({
    paramName: 'title',
  });

  const { mutate } = useSWRConfig();
  const handleOnReset = (reset) => {
    const key =
      reset.reason === ERROR_BOUNDARY_RESET_REASON.KEYS
        ? reset.prev[0]
        : param.value;

    mutate(key, undefined, { revalidate: true });
  };

  return (
    <Page>
      <BasicInput autoFocus value={input.value} onChange={input.onChange} />
      <ErrorBoundary
        FallbackComponent={({ resetErrorBoundary }) => (
          <BooksListStates.Error onRetry={resetErrorBoundary} />
        )}
        onReset={handleOnReset}
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
