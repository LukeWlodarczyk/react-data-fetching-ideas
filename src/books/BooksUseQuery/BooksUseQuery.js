import Page from '@/ui/Page';
import BooksListStates from '@/ui/BooksListStates';
import SearchInput from '@/ui/SearchInput';

import useBooks from './useBooks';

const Books = () => {
  const {
    books,
    isLoading,
    isSuccess,
    isEmptyTitle,
    isApiError,
    isNoBooksError,
    refetch,
    input,
  } = useBooks();

  return (
    <Page>
      <SearchInput
        autoFocus
        name="title"
        placeholder="book title..."
        value={input.value}
        onChange={input.onChange}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isEmpty={isEmptyTitle}
        isEmptyBooks={isNoBooksError}
        isError={isApiError}
      />
      {isSuccess && <BooksListStates.Success books={books} />}
      {isLoading && <BooksListStates.Loading />}
      {isNoBooksError && <BooksListStates.Empty />}
      {isApiError && <BooksListStates.Error onRetry={refetch} />}
      {isEmptyTitle && <BooksListStates.EmptyTitle />}
    </Page>
  );
};

export default Books;
