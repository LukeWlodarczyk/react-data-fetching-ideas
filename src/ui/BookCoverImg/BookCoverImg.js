import { useState, memo } from 'react';

import styles from './BookCoverImg.module.css'

import BookSvg from './book.svg';

const BookCoverImg = memo(({ coverId }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleOnLoad = () => setIsLoaded(true);

    const sizeStyle = { width: '100px', height: '140px' };

    const opacityStyle = isLoaded ? { opacity: 1 } : { opacity: 0 };

    return (
        <div className={styles.wrapper}>
            <img src={BookSvg} className={styles.placeholder} style={{ opacity: isLoaded ? 0 : 1 }} />
            <img
                loading='lazy'
                onLoad={handleOnLoad}
                src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg?default=false`} 
                style={{  ...{ transition: 'opacity .6s', borderRadius: '8px' }, ...opacityStyle, ...sizeStyle }} 
            />
        </div>
    )
});

export default BookCoverImg;