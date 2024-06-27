import { useState, useEffect } from "react";

import { fetchBooksByAuthor } from "../../api/books";

const useBooksApi = (author) => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const getBooksByAuthor = async (author) => {
      try {
        setError(null);
        setIsLoading(true);
        const books = await fetchBooksByAuthor(author);
        setBooks(books);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      getBooksByAuthor(author);
    }, []);

    const clearBooks = () => setBooks([]);

    return { books, isLoading, error, clearBooks, getBooksByAuthor };
}

export default useBooksApi;