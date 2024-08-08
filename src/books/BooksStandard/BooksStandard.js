import Page from '@/ui/Page';
import SearchInput from '@/ui/SearchInput';
import BooksListStates from '@/ui/BooksListStates';

import useBooks from './useBooks';

const Books = () => {
  const {
    books,
    isLoading,
    isSuccess,
    isEmptySuccess,
    isEmptyTitle,
    isApiError,
    input,
    refetch,
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
        isEmptyBooks={isEmptySuccess}
        isError={isApiError}
      />
      {isSuccess && <BooksListStates.Success books={books} />}
      {isLoading && <BooksListStates.Loading />}
      {isEmptySuccess && <BooksListStates.Empty />}
      {isApiError && <BooksListStates.Error onRetry={refetch} />}
      {isEmptyTitle && <BooksListStates.EmptyTitle />}
    </Page>
  );
};

export default Books;
