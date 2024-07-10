import styles from './BookCard.module.css'

import BookCoverImg from '../BookCoverImg';

const BookCard = ({ book }) => (
    <div className={styles.wrapper}>
        <BookCoverImg coverId={book.cover_i}  />
        <div className={styles.description}>
            <h4 className={styles.title}>{book.title} {book.first_publish_year && <span className={styles.year}>({book.first_publish_year})</span>}</h4>
            {book.author_name && <p className={styles.authors}>{book.author_name.join(', ')}</p>}
            {book.subject && <div className={styles.subjects}>
                {book.subject.slice(0, 3).map(subject => <div key={subject} className={styles.subject}>{subject}</div>)}
            </div>}
        </div>
    </div>
)

export default BookCard;