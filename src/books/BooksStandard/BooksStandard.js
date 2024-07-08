import Loader from "../../Loader";
import ErrorMessage from "../../ErrorMessage";

import BooksList from '../../ui//BooksList';

import useBooks from "./useBooks";

const Books = () => {
  const { books, showLoader, showBooks, showNoTitleInfo, isApiError, isNoBooksError, title, onChangeTitle } = useBooks();

  return (
    <div>
      <input name='title' value={title} onChange={onChangeTitle} />
      {showLoader &&  <Loader /> }
      {showBooks && <BooksList books={books} />}
      {isNoBooksError && <ErrorMessage message={`Books not found for provided title - ${title}`} />}
      {isApiError && <ErrorMessage />}
      {showNoTitleInfo && <p>Type in book title</p>}
    </div>
  );
};

export default Books;
