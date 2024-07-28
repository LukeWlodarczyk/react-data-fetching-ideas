import React, { Suspense } from 'react';

import Page from '@/ui/Page';
import BooksListStates from '@/ui/BooksListStates';
import { BasicInput } from '@/ui/SearchInput';

import BooksListSuspendable from './BooksListSuspendable';

import useTitle from '@/hooks/useTitle';

const DEBOUNCE = 300;

const Books = () => {
  const { title, onChange } = useTitle({ debounce: DEBOUNCE });
  const hasTitle = Boolean(title.trim());

  return (
    <Page>
      <BasicInput value={title} onChange={onChange} />
      {!hasTitle && <BooksListStates.EmptyTitle />}
      {hasTitle && (
        <Suspense fallback={<BooksListStates.Loading />}>
          <BooksListSuspendable title={title} debounce={DEBOUNCE} />
        </Suspense>
      )}
    </Page>
  );
};

export default Books;
