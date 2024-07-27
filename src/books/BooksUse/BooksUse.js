import { Suspense } from "react";

import Page from "../../ui/Page";
import { BasicInput } from "../../ui/SearchInput";
import BooksListLoader from "../../ui/BooksListLoader";

import BooksListSuspendable from './BooksListSuspendable';

import useTitle from '../../hooks/useTitle';

const Books = () => {
  const { title, paramTitle, onChange } = useTitle();

  return (
    <Page>
      <BasicInput value={title} onChange={onChange} />
      <Suspense fallback={<BooksListLoader /> }>
        <BooksListSuspendable title={paramTitle} />
      </Suspense>
    </Page>
  );
};

export default Books;
