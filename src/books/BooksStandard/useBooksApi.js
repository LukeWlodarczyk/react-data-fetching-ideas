import { useState, useEffect, useCallback } from "react";

import { fetchBooksByTitle } from "../../api/books";
import useAbortController from "./useAbortController";

function _debounce(f, defaultTime = 0) {
  let timer = null;
  let time = defaultTime

  const debounced = (...args) => {
    if (time === 0) return f(...args);
    
    return new Promise((resolve) => {
      clearTimeout(timer);
      timer = setTimeout(
        () => resolve(f(...args)),
        time,
      );
    });
  };

  debounced.cancel = () => {
    clearTimeout(timer);
  }

  debounced.setTime = (msec) => {
    time = msec;
    return debounced;
  }

  return debounced;
}

const debouncedFetchBooksByTitle = _debounce(fetchBooksByTitle);

const useBooksApi = (title) => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const abortController = useAbortController();

    const setInitialState = () => {
      setError(null);
      setBooks([]);
      setIsLoading(false);
    }
  
    const getBooksByTitle = useCallback(async (title, { ac = new AbortController, debounce = 0, abortParallel = false } = {}) => {
      setError(null)
      setIsLoading(true)

      if (title.trim().length === 0) {
        setInitialState()
        debounce && debouncedFetchBooksByTitle.cancel();
        return abortController.abortAll();
      }

      if (abortParallel) {
        abortController.abortAll();
      }

      abortController.add(ac);

      const fetch = debounce ? debouncedFetchBooksByTitle.setTime(debounce) : fetchBooksByTitle;

      try {
        const books = await fetch(title, { signal: ac.signal });
        setBooks(books);
      } catch (error) {
        if (!abortController.isAborted(ac)) setError(error);
      } finally {
        if (!abortController.isAborted(ac)) setIsLoading(false);
        abortController.abort(ac)
      }
    }, [])
  
    useEffect(() => {
      getBooksByTitle(title);
      return () => abortController.cleanUp();
    }, []);

    return { 
      books, 
      isLoading,
      error,  
      refetch: getBooksByTitle, 
    };
}

export default useBooksApi;