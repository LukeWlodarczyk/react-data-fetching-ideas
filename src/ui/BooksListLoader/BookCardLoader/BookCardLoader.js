import styles from './BookCardLoader.module.css'

import BookCoverImgPlaceholder from '../../BookCoverImgPlaceholder';

const BookCardLoader = () => (
    <div className={styles.wrapper}>
        <div className={styles.placeholderWrapper}>
            <BookCoverImgPlaceholder isLoading />
        </div>
        <div className={styles.description}>
            <div className={styles.heading}>
                <div className={styles.title}></div>
                <div className={styles.year}></div>
            </div>
            <div className={styles.authors}></div>
            <div className={styles.subjects}>
                {[1, 2, 3].map(n => <div key={n} className={styles.subject}></div>)}
            </div>
        </div>
    </div>
)


export default BookCardLoader;