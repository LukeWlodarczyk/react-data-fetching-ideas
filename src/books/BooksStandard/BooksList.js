import { useState } from 'react';

const BookCoverImg = ({ isbn }) => {
    const [loaded, setLoaded] = useState(false);
    const handleOnLoad = () => {
        setLoaded(true);
    };

    const style = loaded ? { opacity: 1 } : { opacity: 0 }; 

    return <img style={{ ...style, ...{ transition: '1s' }}} onLoad={handleOnLoad} src={`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`} width={150} height={200} />
}

const BooksList = ({ books }) => {
    return books.map((book) => (
        <li key={book.key}>
            {book.isbn && <BookCoverImg isbn={book.isbn[0]}  />}
            {book.title}
        </li>
))};

export default BooksList;
