import styles from './BasicSearchInput.module.css'

const BasicInput = ({ ...props }) => {
    return <input className={styles.search} {...props}/>;
};

export default BasicInput;