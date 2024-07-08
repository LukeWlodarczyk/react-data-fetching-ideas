import styles from './SearchInput.module.css'

const SearchInput = ({ ...props }) => {
    return <input className={styles.search} {...props}/>
}

export default SearchInput;