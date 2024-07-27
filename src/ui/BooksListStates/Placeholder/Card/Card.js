import styles from './Card.module.css'

import BookCoverImgPlaceholder from '../../../BookCoverImgPlaceholder';

const Card = ({ coverImgClass, isLoading }) => (
    <div className={styles.wrapper}>
        <div className={styles.placeholderWrapper}>
            <BookCoverImgPlaceholder isLoading={isLoading} className={coverImgClass} />
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
);

export default Card;
