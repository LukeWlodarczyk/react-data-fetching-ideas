import styles from './SearchInput.module.css'

const SearchInput = ({ isLoading, isSuccess, isEmpty, isEmptyBooks, isError, ...props }) => {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.inputWrapper} ${isLoading && styles.loading} ${isSuccess && styles.success} ${isEmpty && styles.empty} ${isEmptyBooks && styles.emptyBooks} ${isError && styles.error}`}>
                <input className={styles.search} {...props}/>
            </div>
            </div>
    )
}

export default SearchInput;