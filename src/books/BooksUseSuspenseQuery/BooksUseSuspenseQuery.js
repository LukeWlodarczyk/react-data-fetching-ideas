import { Suspense } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import Page from '@/ui/Page';
import BooksListStates from '@/ui/BooksListStates';
import { BasicInput } from '@/ui/SearchInput';

import BooksListSuspendable from './BooksListSuspendable';

import useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';

const Books = () => {
  const { input, param } = useInputWithDebouncedParam({
    paramName: 'title',
  });

  const { reset } = useQueryErrorResetBoundary();

  return (
    <Page>
      <BasicInput autoFocus value={input.value} onChange={input.onChange} />
      {!param.hasValue && <BooksListStates.EmptyTitle />}
      {param.hasValue && (
        <ErrorBoundary
          FallbackComponent={({ resetErrorBoundary }) => (
            <BooksListStates.Error onRetry={resetErrorBoundary} />
          )}
          onReset={reset}
          resetKeys={[input.value]}
        >
          <Suspense fallback={<BooksListStates.Loading />}>
            <BooksListSuspendable title={param.value} />
          </Suspense>
        </ErrorBoundary>
      )}
    </Page>
  );
};

export default Books;
