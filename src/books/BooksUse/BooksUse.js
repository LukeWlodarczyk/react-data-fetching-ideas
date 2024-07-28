import { Suspense } from "react";

import Page from "../../ui/Page";
import BooksListStates from "../../ui/BooksListStates";
import { BasicInput } from "../../ui/SearchInput";

import BooksListSuspendable from './BooksListSuspendable';

import useTitle from '../../hooks/useTitle';

const Books = () => {
  const { title, paramTitle, onChange } = useTitle();
  const hasTitle = Boolean(paramTitle.trim());

  return (
    <Page>
      <BasicInput value={title} onChange={onChange} />
      {!hasTitle && <BooksListStates.EmptyTitle />}
      {hasTitle && (
            <Suspense fallback={<BooksListStates.Loading /> }>
                <BooksListSuspendable title={paramTitle} />
            </Suspense>
    </Page>
  );
};

export default Books;
