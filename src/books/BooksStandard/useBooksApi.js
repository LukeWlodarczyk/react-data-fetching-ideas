import { useState, useEffect } from 'react';

import { fetchBooksByTitle } from '@/api/books';

const LOADING_STATE = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  DONE: 'DONE',
};

const useBooksApi = (title, { enable }) => {
  const [books, setBooks] = useState([]);
  const [loadingState, setLoadingState] = useState(LOADING_STATE.IDLE);
  const [error, setError] = useState(null);

  const setInitialState = () => {
    setBooks([]);
    setLoadingState(LOADING_STATE.IDLE);
    setError(null);
  };

  const getBooksByTitle = async (
    title,
    { ac = new AbortController() } = {}
  ) => {
    setInitialState();
    setLoadingState(LOADING_STATE.LOADING);

    try {
      const books = await fetchBooksByTitle(title, {
        signal: ac.signal,
      });
      setBooks(books);
    } catch (error) {
      if (!ac.signal.aborted) setError(error);
    } finally {
      if (!ac.signal.aborted) setLoadingState(LOADING_STATE.DONE);
    }
  };

  useEffect(() => {
    const ac = new AbortController();

    if (enable) getBooksByTitle(title, { ac });
    else setInitialState();

    return () => ac.abort();
  }, [title, enable]);

  return {
    books,
    isLoading: loadingState === LOADING_STATE.LOADING,
    isDone: loadingState === LOADING_STATE.DONE,
    error,
    refetch: getBooksByTitle,
  };
};

export default useBooksApi;
