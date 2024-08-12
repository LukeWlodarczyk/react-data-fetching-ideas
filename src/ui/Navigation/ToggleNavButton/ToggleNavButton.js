import styles from './ToggleNavButton.module.css';

const ToggleNavButton = ({ onClick }) => (
  <button className={styles.toggleBtn} onClick={onClick}></button>
);

export default ToggleNavButton;
