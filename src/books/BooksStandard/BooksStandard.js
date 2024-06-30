import Loader from "../../Loader";
import ErrorMessage from "../../ErrorMessage";

import BooksList from './BooksList';

import useBooks from "./useBooks";

const Books = () => {
  const { books, hasBooks, isLoading, isApiError, title, onChangeTitle } = useBooks();

  return (
    <div>
      <input name='title' value={title} onChange={onChangeTitle} />
      {isLoading &&  <Loader /> }
      {hasBooks && <BooksList books={books} />}
      {isApiError && <ErrorMessage />}
      {!title && <p>Type in book title</p>}
    </div>
  );
};

export default Books;
