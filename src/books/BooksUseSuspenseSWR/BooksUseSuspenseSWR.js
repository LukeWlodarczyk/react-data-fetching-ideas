import { Suspense } from "react";

import BooksListLoader from "../../ui/BooksListLoader";
import { BasicInput } from "../../ui/SearchInput";

import BooksListSuspendable from './BooksListSuspendable';

import useTitle from './useTitle';

const Books = () => {
  const { title, paramTitle, onChange } = useTitle();

  const hasTitle = Boolean(paramTitle.trim());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '60px' }}>
      <BasicInput value={title} onChange={onChange} />
      {!hasTitle && <p>Type in book title</p>}
      {hasTitle && (
        <Suspense fallback={<BooksListLoader /> }>
          <BooksListSuspendable title={paramTitle} />
        </Suspense>
      )}
    </div>
  );
};

export default Books;
