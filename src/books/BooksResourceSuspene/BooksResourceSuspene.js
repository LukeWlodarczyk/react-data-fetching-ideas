import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Page from '@/ui/Page';
import BooksListStates from '@/ui/BooksListStates';
import { BasicInput } from '@/ui/SearchInput';

import useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';
import { fetchBooksByTitle } from '@/api/books';
import memoize from '@/api/memoize';

import SuspendableResource from './SuspendableResource';

import createResource from './resource';

const booksResource = createResource(memoize(fetchBooksByTitle));

const Books = () => {
  const { input, param } = useInputWithDebouncedParam({
    paramName: 'title',
    debounce: 400,
  });

  return (
    <Page>
      <BasicInput autoFocus value={input.value} onChange={input.onChange} />
      <ErrorBoundary
        FallbackComponent={({ resetErrorBoundary }) => (
          <BooksListStates.Error onRetry={resetErrorBoundary} />
        )}
        resetKeys={[param.value]}
        onReset={booksResource.reset}
      >
        <Suspense fallback={<BooksListStates.Loading />}>
          <SuspendableResource
            resource={booksResource}
            query={param.value}
            isDisabled={!param.hasValue}
          >
            {({ data, isDisabled }) => (
              <>
                {data?.length > 0 && <BooksListStates.Success books={data} />}
                {data?.length === 0 && <BooksListStates.Empty />}
                {isDisabled && <BooksListStates.EmptyTitle />}
              </>
            )}
          </SuspendableResource>
        </Suspense>
      </ErrorBoundary>
    </Page>
  );
};

export default Books;
