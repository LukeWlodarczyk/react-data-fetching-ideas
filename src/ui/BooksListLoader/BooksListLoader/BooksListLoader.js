import BookCardLoader from "../BookCardLoader"

const BooksListLoader = ({ count = 3 }) => Array.from({ length: count }).map((_, i) => <BookCardLoader key={i} />);

export default BooksListLoader;
