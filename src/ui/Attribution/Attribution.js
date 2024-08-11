import styles from './Attribution.module.css';

const Attribution = ({ children }) => (
  <>
    <p className={styles.attribution}>{children}</p>
    <p className={styles.attribution}>{children}</p>
  </>
);

const AttributionBar = () => (
  <div className={styles.wrapper}>
    <Attribution>
      <span>
        Vectors and icons by{' '}
        <a
          href="https://vectordoodle.gumroad.com/l/FOCLd?ref=svgrepo.com"
          target="_blank"
          className={styles.attributionLink}
        >
          Vectordoodle
        </a>{' '}
        in CC Attribution License via{' '}
        <a
          href="https://www.svgrepo.com/"
          target="_blank"
          className={styles.attributionLink}
        >
          SVG Repo
        </a>
      </span>
    </Attribution>
  </div>
);

export default AttributionBar;
