import { useState, useEffect, useCallback } from "react";

import { fetchBooksByTitle } from "../../api/books";

const useBooksApi = (title) => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const getBooksByTitle = useCallback(async (title, { signal } = {}) => {
      try {
        setError(null);
        setIsLoading(true);
        const books = await fetchBooksByTitle(title, { signal });
        setBooks(books);
      } catch (error) {
        if (signal && signal.aborted) return;
        setError(error);
        setBooks([]);
      } finally {
        if (signal && signal.aborted) return;
        setIsLoading(false);
      }
    }, [])
  
    useEffect(() => {
      const ac = new AbortController();

      getBooksByTitle(title, { signal: ac.signal });

      return () => ac.abort('AbortFetchRequest - component unmounted');
    }, []);

    const clearBooks = () => setBooks([]);

    return { books, isLoading, error, clearBooks, getBooksByTitle };
}

export default useBooksApi;