import { useState, memo } from 'react';

import cn from 'classnames';

import BookCoverImgPlaceholder from '../BookCoverImgPlaceholder';

import styles from './BookCoverImg.module.css';

const getImgSrc = (coverId) =>
  `https://covers.openlibrary.org/b/id/${coverId}-M.jpg?default=false`;

const BookCoverImg = memo(({ coverId }) => {
  const hasCoverId = coverId !== undefined;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(!hasCoverId);

  const handleOnLoad = () => setIsLoaded(true);
  const handleOnError = () => setIsError(true);

  const isLoading = !isLoaded && !isError;

  return (
    <div className={styles.wrapper}>
      <BookCoverImgPlaceholder isLoading={isLoading} isDefault={isError} />
      {hasCoverId && (
        <img
          className={cn(styles.cover, { [styles.show]: isLoaded })}
          onLoad={handleOnLoad}
          onError={handleOnError}
          src={getImgSrc(coverId)}
        />
      )}
    </div>
  );
});

export default BookCoverImg;
