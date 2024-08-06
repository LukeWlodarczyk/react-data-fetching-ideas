const memoize = (fetcher, resolver = (...args) => args[0]) => {
  const cacheMap = new Map();

  const memoized = (...args) => {
    const key = resolver(...args);

    const cached = cacheMap.get(key);

    if (cached) return cached;

    const promise = fetcher(...args)
      .then((data) => {
        promise.isResolved = true;
        return data;
      })
      .catch((e) => {
        cacheMap.delete(key);
        throw e;
      });

    cacheMap.set(key, promise);

    return promise;
  };

  const cleanup = (key) => {
    const cached = cacheMap.get(key);

    if (!cached?.isResolved) cacheMap.delete(key);
  };

  memoized.cleanup = cleanup;

  return memoized;
};

export default memoize;
