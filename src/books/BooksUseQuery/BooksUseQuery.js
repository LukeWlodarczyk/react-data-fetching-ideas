import Page from "../../ui/Page";
import BooksListLoader from "../../ui/BooksListLoader";
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import BooksList from '../../ui/BooksList';
import SearchInput from "../../ui/SearchInput";

import useBooks from "./useBooks";

const Books = () => {
  const {
    books, 
    isLoading, 
    isSuccess,
    isEmptyTitle,
    isApiError, 
    isNoBooksError, 
    title, 
    onChangeTitle,
  } = useBooks();

  return (
    <Page>
      <SearchInput 
        autoFocus
        name='title' 
        placeholder='book title...' 
        value={title} 
        onChange={onChangeTitle} 
        isLoading={isLoading} 
        isSuccess={isSuccess}
        isEmpty={isEmptyTitle}
        isEmptyBooks={isNoBooksError}
        isError={isApiError}
      />
      {isSuccess && <BooksList books={books} />}
      {isLoading && <BooksListLoader />}
      {isNoBooksError && <ErrorMessage message={`Books not found for provided title - ${title}`} />}
      {isApiError && <ErrorMessage />}
      {isEmptyTitle && <p>Type in book title</p>}
  </Page>
  );
};

export default Books;
