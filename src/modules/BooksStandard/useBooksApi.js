import { useEffect, useReducer } from 'react';

import { fetchBooksByTitle } from '@/api/books';

import { reducer, initialState, ACTIONS, REQUEST_STATUS } from './reducer';

const useBooksApi = (title, { enable }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getBooksByTitle = async (
    title,
    { ac = new AbortController() } = {}
  ) => {
    dispatch({ type: ACTIONS.INIT });

    try {
      const data = await fetchBooksByTitle(title, {
        signal: ac.signal,
      });

      dispatch({ type: ACTIONS.RESOLVE, payload: data });
    } catch (error) {
      if (!ac.signal.aborted)
        dispatch({ type: ACTIONS.REJECT, payload: error });
    }
  };

  useEffect(() => {
    const ac = new AbortController();

    if (enable) getBooksByTitle(title, { ac });
    else dispatch({ type: ACTIONS.RESET });

    return () => ac.abort();
  }, [title, enable]);

  const { data, error, status } = state;

  return {
    data,
    isLoading: status === REQUEST_STATUS.LOADING,
    isSuccess: status === REQUEST_STATUS.SUCCESS,
    error,
    refetch: getBooksByTitle,
  };
};

export default useBooksApi;
