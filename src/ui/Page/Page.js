import styles from './Page.module.css';

const Page = ({ children }) => <section className={styles.wrapper}>{children}</section>;

export default Page;