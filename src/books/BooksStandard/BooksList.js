const BooksList = ({ books }) => books.map((book) => (<li key={book.key}>{book.title}</li>));

export default BooksList;
