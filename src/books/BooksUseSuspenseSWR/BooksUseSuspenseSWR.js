import { Suspense } from "react";

import Page from "../../ui/Page";
import BooksListLoader from "../../ui/BooksListLoader";
import { BasicInput } from "../../ui/SearchInput";

import BooksListSuspendable from './BooksListSuspendable';

import useTitle from '../../hooks/useTitle';

const Books = () => {
  const { title, paramTitle, onChange } = useTitle();

  const hasTitle = Boolean(paramTitle.trim());

  return (
    <Page>
      <BasicInput value={title} onChange={onChange} />
      {!hasTitle && <p>Type in book title</p>}
      {hasTitle && (
        <Suspense fallback={<BooksListLoader /> }>
          <BooksListSuspendable title={paramTitle} />
        </Suspense>
      )}
    </Page>
  );
};

export default Books;
