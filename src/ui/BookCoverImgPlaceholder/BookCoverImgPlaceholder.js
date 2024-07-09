import BookSvg from './book.svg';

import styles from './BookCoverImgPlaceholder.module.css'

const BooksCoverImgPlaceholder = ({ className, ...props }) => <img src={BookSvg} className={`${styles.placeholder} ${className}`} {...props} />

export default BooksCoverImgPlaceholder;
