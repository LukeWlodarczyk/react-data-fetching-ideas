import { Suspense } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import Page from '@/ui/Page';
import BooksListStates from '@/ui/BooksListStates';
import { BasicInput } from '@/ui/SearchInput';

import BooksListSuspendable from './BooksListSuspendable';

import useTitle from '@/hooks/useTitle';

const Books = () => {
  const { title, paramTitle, onChange } = useTitle();
  const hasTitle = Boolean(paramTitle.trim());

  const { reset } = useQueryErrorResetBoundary();

  return (
    <Page>
      <BasicInput autoFocus value={title} onChange={onChange} />
      {!hasTitle && <BooksListStates.EmptyTitle />}
      {hasTitle && (
        <ErrorBoundary
          FallbackComponent={({ resetErrorBoundary }) => (
            <BooksListStates.Error onRetry={resetErrorBoundary} />
          )}
          onReset={reset}
          resetKeys={[title]}
        >
          <Suspense fallback={<BooksListStates.Loading />}>
            <BooksListSuspendable title={paramTitle} />
          </Suspense>
        </ErrorBoundary>
      )}
    </Page>
  );
};

export default Books;
