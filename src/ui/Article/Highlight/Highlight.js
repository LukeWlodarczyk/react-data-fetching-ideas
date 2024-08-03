import styles from './Highlight.module.css';

const Highlight = ({ children }) => (
  <span className={styles.highlight}>{children}</span>
);

export default Highlight;
