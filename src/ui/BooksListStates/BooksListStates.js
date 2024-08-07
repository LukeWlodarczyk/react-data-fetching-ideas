import ListPlaceholder from './Placeholder';
import BooksList from '../BooksList';

import styles from './BooksListStates.module.css';

export default {
  Success: BooksList,
  EmptyTitle: () => (
    <ListPlaceholder coverImgClass={styles.emptyTitleCoverImg} />
  ),
  Loading: () => <ListPlaceholder isLoading />,
  Empty: () => <ListPlaceholder coverImgClass={styles.emptyCoverImg} />,
  Error: ({ onRetry }) => (
    <ListPlaceholder coverImgClass={styles.errorCoverImg} onRetry={onRetry} />
  ),
};
