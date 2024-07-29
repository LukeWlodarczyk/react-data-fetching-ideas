const memoize = (fetcher, resolver = (...args) => args[0]) => {
  const cacheMap = new Map();

  return (...args) => {
    const key = resolver(...args);

    const cached = cacheMap.get(key);

    if (cached) return cached;

    const promise = fetcher(...args).catch((e) => {
      cacheMap.delete(key);
      throw e;
    });

    cacheMap.set(key, promise);

    return promise;
  };
};

export default memoize;
