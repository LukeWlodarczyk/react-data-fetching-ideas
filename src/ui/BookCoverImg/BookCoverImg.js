import { useState, memo } from 'react';

import styles from './BookCoverImg.module.css'

import BookCoverImgPlaceholder from '../BookCoverImgPlaceholder';

const BookCoverImg = memo(({ coverId }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleOnLoad = () => setIsLoaded(true);

    return (
        <div className={styles.wrapper}>
            <BookCoverImgPlaceholder className={styles.placeholder} style={{ opacity: isLoaded ? 0 : 1 }} />
            <img
                loading='lazy'
                onLoad={handleOnLoad}
                src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg?default=false`} 
                className={styles.cover}
                style={{ opacity: isLoaded ? 1 : 0 }} 
            />
        </div>
    )
});

export default BookCoverImg;