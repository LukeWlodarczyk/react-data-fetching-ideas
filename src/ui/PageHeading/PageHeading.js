import styles from './PageHeading.module.css';

const PageHeading = ({ children, level }) => {
  const Heading = `h${level}`;
  return <Heading className={styles.heading}>{children}</Heading>;
};

export default PageHeading;
