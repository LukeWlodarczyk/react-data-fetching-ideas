import Loader from "../../Loader";
import ErrorMessage from "../../ErrorMessage";

import BooksList from './BooksList';

import useBooks from "./useBooks";

const Books = () => {
  const { books, isLoading, isApiError, author, onChangeAuthor } = useBooks();

  return (
    <div>
      <input name='author' value={author} onChange={onChangeAuthor} />
      <p>Suggestions</p>
      <ul>
        {isLoading ? <Loader /> : <BooksList books={books} />}
        {(isApiError && !isLoading) && <ErrorMessage />}
        {/* {(!isApiError && author) && booksList} */}
        {!author && <p>Type in author name</p>}
        {/* {author && !isApiError && !hasBooks && !isLoading && !isAuthorError && <Loader />} */}
      </ul>
    </div>
  );
};

export default Books;
