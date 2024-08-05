import axios from 'axios';

import { BASE_URL } from './constants';

const getBooksByTitleApiUrl = ({ title, limit }) =>
  `${BASE_URL}/search.json?title=${title}&limit=${limit}`;

const request = ({ title }, { signal }) =>
  axios(getBooksByTitleApiUrl({ title, limit: 3 }), { signal });


export const fetchBooksByTitle = async (title, { signal } = {}) => {
  const res = await request({ title }, { signal });

  return res.data.docs;
};
