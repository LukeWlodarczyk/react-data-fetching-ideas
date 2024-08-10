import styles from './Author.module.css';

const Author = ({ children, coAuthor }) => {
  return (
    <span>
      <span className={styles.author}>{children}</span>{' '}
      {coAuthor && <span className={styles.coAuthor}>{coAuthor}</span>}
    </span>
  );
};

export default Author;
