import React, { Suspense } from "react";

import Page from "../../ui/Page";
import BooksListLoader from "../../ui/BooksListLoader";
import { BasicInput } from "../../ui/SearchInput";

import BooksListSuspendable from './BooksListSuspendable';

import useTitle from '../../hooks/useTitle';

const DEBOUNCE = 300;

const Books = () => {
  const { title, onChange } = useTitle({ debounce: DEBOUNCE });

  return (
    <Page>
      <BasicInput value={title} onChange={onChange} />
      <Suspense fallback={<BooksListLoader /> }>
        <BooksListSuspendable title={title} debounce={DEBOUNCE} />
      </Suspense>
    </Page>
  );
};

export default Books;
