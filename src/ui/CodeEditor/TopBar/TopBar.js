import styles from './TopBar.module.css';
import Icon from '@/ui/Icon';

const TopBar = ({ title }) => (
  <section className={styles.wrapper}>
    <Icon name="atom" size="x-small" />
    <span className={styles.fileName}>{title}</span>
  </section>
);

export default TopBar;
