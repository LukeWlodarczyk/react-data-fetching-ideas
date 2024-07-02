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
    console.log('cancel', timer)
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
    const [error, setError] = useState(null);

    const abortController = useAbortController();

    const setInitialState = () => {
      setError(null);
      setBooks([]);
    }
  
    const getBooksByTitle = useCallback(async (title, { ac = new AbortController, debounce = 0, abortParallel = false } = {}) => {
      setInitialState();

      if (title.trim().length === 0 || abortParallel) {
        console.log('abort')
        abortController.abortAll();
      }

      if (title.trim().length === 0 && debounce) {
        console.log('empty')
        return debouncedFetchBooksByTitle.cancel();
      }

      abortController.add(ac);

      const fetch = debounce ? debouncedFetchBooksByTitle.setTime(debounce) : fetchBooksByTitle;

      try {
        console.log('start')
        const books = await fetch(title, { signal: ac.signal });
        setBooks(books);
      } catch (error) {
        if (!abortController.isAborted(ac)) setError(error);
      } finally {
        abortController.abort(ac)
      }
    }, [])
  
    useEffect(() => {
      getBooksByTitle(title);
      return () => abortController.cleanUp();
    }, []);

    return { 
      books, 
      isLoading: Boolean(title.trim()) && !Boolean(error) && books.length === 0, 
      error,  
      getBooksByTitle, 
    };
}

export default useBooksApi;