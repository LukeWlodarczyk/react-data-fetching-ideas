import styles from './Header.module.css';

const Header = ({ children }) => (
  <header className={styles.header}>{children}</header>
);

export default Header;
