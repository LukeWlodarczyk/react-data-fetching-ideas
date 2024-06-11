import { useState, useEffect } from "react";

import { fetchBooks } from "../api/books";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      try {
        setIsLoading(true);
        const books = await fetchBooks();
        setBooks(books);
      } catch (error) {
        
      } finally {
        setIsLoading(false);
      }
    };

    getBooks()
  }, []);

  if(isLoading) {
    return <p>Loading books...</p>;
  }

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  );
};

export default Books;
