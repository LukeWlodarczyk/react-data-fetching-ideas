import axios from 'axios';

const getBooksApiUrlByTitle = ({ title, limit }) => `https://openlibrary.org/search.json?title=${title}&limit=${limit}`;

const cacheMap = new Map();

const cache = (fetcher, key) => {
  const cached = cacheMap.get(key);

  if (cached && !cached.isRejected) {
    return cached;
  }

  const promise = fetcher()
    .then(data => {
      promise.isResolved = true;
      return data;
    })
    .catch(e => {
      promise.isRejected = true;
      throw e;
    })

    cacheMap.set(key, promise);

  return promise;
}

export const fetchBooksByTitle = async (title, { signal, cacheEnabled = false } = {}) => {
  const fetcher = () => axios(getBooksApiUrlByTitle({ title, limit: 3 }), { method: 'GET', signal  });

  const res = cacheEnabled ? await cache(fetcher, title) : await fetcher();

  return res.data.docs;
};


export const fetchBooksData = () => wrapPromise(fetchBooksByTitle());

function wrapPromise(promise) {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
}
