import _memoize from 'lodash/memoize';

import { fetchBooksByTitle } from '@/api/books';

function _debounce(f, defaultTime = 0) {
  let timer = null;
  let time = defaultTime;

  const debounced = (...args) => {
    if (time === 0) return f(...args);

    return new Promise((resolve) => {
      clearTimeout(timer);
      timer = setTimeout(() => resolve(f(...args)), time);
    });
  };

  debounced.cancel = () => {
    clearTimeout(timer);
  };

  debounced.setTime = (msec) => {
    time = msec;
    return debounced;
  };

  return debounced;
}

export const fetchBooksData = () => createBookResource(fetchBooksByTitle);

const createBookResource = (fetcher) => {
  let prevTitle = '';
  let status = 'pending';
  let response;
  let suspender;

  const initFetch = (arg, { cacheEnabled }) =>
    fetcher(arg, { cacheEnabled }).then(
      (res) => {
        status = 'success';
        response = res;
      },
      (err) => {
        status = 'error';
        response = err;
      }
    );

  const dInitFetch = _debounce(initFetch);

  const read = (title, { debounce = 0, cacheEnabled = false } = {}) => {
    if (!suspender || prevTitle !== title) {
      prevTitle = title;
      status = 'pending';
      const createSuspender = debounce
        ? dInitFetch.setTime(debounce)
        : initFetch;
      suspender = createSuspender(title, { cacheEnabled });
    }

    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw response;
      default:
        return response;
    }
  };

  return { read };
};
