import styles from './Quote.module.css';

const Quote = ({ children, author }) => (
  <blockquote className={styles.quote}>
    <p>{children}</p>
    <footer className={styles.footer}>— {author}</footer>
  </blockquote>
);

export default Quote;
