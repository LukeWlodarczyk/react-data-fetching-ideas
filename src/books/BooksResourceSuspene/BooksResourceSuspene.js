import React, { Suspense } from "react";

import BooksListLoader from "../../ui/BooksListLoader";
import { BasicInput } from "../../ui/SearchInput";

import BooksListSuspendable from './BooksListSuspendable';

import useTitle from './useTitle';

const DEBOUNCE = 300;

const Books = () => {
  const { title, onChange } = useTitle({ paramsDebounce: DEBOUNCE });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '60px' }}>
      <BasicInput value={title} onChange={onChange} />
      <Suspense fallback={<BooksListLoader /> }>
        <BooksListSuspendable title={title} debounce={DEBOUNCE} />
      </Suspense>
    </div>
  );
};

export default Books;
