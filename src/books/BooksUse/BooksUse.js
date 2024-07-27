import { Suspense } from "react";

import { BasicInput } from "../../ui/SearchInput";
import BooksListLoader from "../../ui/BooksListLoader";

import BooksListSuspendable from './BooksListSuspendable';

import useTitle from '../../hooks/useTitle';

const Books = () => {
  const { title, paramTitle, onChange } = useTitle();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '60px' }}>
      <BasicInput value={title} onChange={onChange} />
      <Suspense fallback={<BooksListLoader /> }>
        <BooksListSuspendable title={paramTitle} />
      </Suspense>
    </div>
  );
};

export default Books;
