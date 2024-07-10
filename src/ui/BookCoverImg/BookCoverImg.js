import { useState, memo } from 'react';

import styles from './BookCoverImg.module.css'

import BookCoverImgPlaceholder from '../BookCoverImgPlaceholder';

const BookCoverImg = memo(({ coverId }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleOnLoad = () => setIsLoaded(true);
    const handleOnError = () => setIsError(true);

    return (
        <div className={styles.wrapper} style={{ ...(isError && { animationIterationCount: 1 }) }}>
            <BookCoverImgPlaceholder className={styles.placeholder} style={{ opacity: isLoaded ? 0 : 1 }} />
            <img
                loading='lazy'
                onLoad={handleOnLoad}
                onError={handleOnError}
                src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg?default=false`} 
                className={styles.cover}
                style={{ opacity: isLoaded ? 1 : 0 }} 
            />
        </div>
    )
});

export default BookCoverImg;