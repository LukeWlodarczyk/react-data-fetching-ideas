import Page from '@/ui/Page';
import BooksListStates from '@/ui/BooksListStates';
import SearchInput from '@/ui/SearchInput';

import useBooks from './useBooks';

const Books = () => {
  const {
    books,
    isLoading,
    isSuccess,
    isEmptySuccess,
    isEmptyTitle,
    isApiError,
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
        isEmptySuccess={isEmptySuccess}
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
