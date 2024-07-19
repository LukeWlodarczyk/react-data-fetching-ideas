import cn from 'classnames';
import styles from './BookCoverImgPlaceholder.module.css'

const BooksCoverImgPlaceholder = ({ className, ...props }) => <div className={cn(styles.placeholder, className)} {...props}></div>

export default BooksCoverImgPlaceholder;
