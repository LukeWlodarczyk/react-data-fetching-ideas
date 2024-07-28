const cacheMap = new Map();

const cache = (fetcher, key) => {
  const cached = cacheMap.get(key);

  if (cached && !cached.isRejected) {
    return cached;
  }

  const promise = fetcher()
    .then((data) => {
      promise.isResolved = true;
      return data;
    })
    .catch((e) => {
      promise.isRejected = true;
      throw e;
    });

  cacheMap.set(key, promise);

  return promise;
};

export default cache;
