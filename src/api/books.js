import axios from 'axios';

import { BASE_URL } from './constants';

import memoize from './memoize';

const getBooksByTitleApiUrl = ({ title, limit }) => `${BASE_URL}/search.json?title=${title}&limit=${limit}`;

const request = ({ title }, { signal }) => axios(getBooksByTitleApiUrl({ title, limit: 3 }), { signal });
const mRequest = memoize(request, ({ title }) => title);

export const fetchBooksByTitle = async (title, { signal, cacheEnabled = false } = {}) => {
  const fetcher = cacheEnabled ? mRequest : request;

  const res = await fetcher({ title }, { signal });

  return res.data.docs;
};
