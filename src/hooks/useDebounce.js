import { useLayoutEffect, useMemo, useRef } from 'react';
import _debounce from 'lodash/debounce';

const useDebounce = (callback, delay) => {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(
    () => _debounce((...args) => callbackRef.current(...args), delay),
    [delay]
  );
};

export default useDebounce;
