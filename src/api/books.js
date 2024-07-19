import axios from 'axios';

import cache from './cache';

const getBooksApiUrlByTitle = ({ title, limit }) => `https://openlibrary.org/search.json?title=${title}&limit=${limit}`;

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
