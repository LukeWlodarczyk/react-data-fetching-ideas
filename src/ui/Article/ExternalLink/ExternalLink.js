import styles from './ExternalLink.module.css';

const ExternalLink = ({ children, href }) => (
  <a target="_blank" href={href} className={styles.link}>
    {children}
  </a>
);

export default ExternalLink;
