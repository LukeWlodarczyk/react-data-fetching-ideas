import cn from 'classnames';

import styles from './Animation.module.css';

const Animation = ({
  isLoading,
  isSuccess,
  isEmpty,
  isEmptyBooks,
  isError,
  children,
}) => (
  <div
    className={cn([
      styles.animationWrapper,
      {
        [styles.loading]: isLoading,
        [styles.success]: isSuccess,
        [styles.empty]: isEmpty,
        [styles.emptyBooks]: isEmptyBooks,
        [styles.error]: isError,
      },
    ])}
  >
    {children}
  </div>
);

export default Animation;
