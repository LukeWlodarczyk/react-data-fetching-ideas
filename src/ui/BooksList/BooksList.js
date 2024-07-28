import BookCard from '../BookCard/BooksCard';

import styles from './BooksList.module.css';

const BooksList = ({ books }) => {
  return (
    <ul className={styles.list}>
      {books.map((book) => (
        <li key={book.key} className={styles.item}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
};

export default BooksList;
