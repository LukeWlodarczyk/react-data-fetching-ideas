import { Suspense } from "react";

import BooksListSuspendable from './BooksListSuspendable';

import { BooksListLoader } from '../../ui/Loader';

import useTitle from './useTitle';

const Books = () => {
  const { title, paramTitle, onChange } = useTitle();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '60px' }}>
      <input value={title} onChange={onChange} />
      <Suspense fallback={<BooksListLoader /> }>
        <BooksListSuspendable title={paramTitle} />
      </Suspense>
    </div>
  );
};

export default Books;
