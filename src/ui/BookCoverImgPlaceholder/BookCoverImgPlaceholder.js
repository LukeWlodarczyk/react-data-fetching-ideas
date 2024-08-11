import cn from 'classnames';
import styles from './BookCoverImgPlaceholder.module.css';

const BooksCoverImgPlaceholder = ({ className, isLoading, isDefault }) => (
  <div
    className={cn(
      styles.wrapper,
      { [styles.loading]: isLoading, [styles.default]: isDefault },
      className
    )}
  ></div>
);

export default BooksCoverImgPlaceholder;
