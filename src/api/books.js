const BOOKS_MOCK = [
  { id: 1, name: "Harry Potter and the Philosopher's Stone" },
  { id: 2, name: "The Lord of the Rings" },
];

const BOOKS_API_URL = 'https://wolnelektury.pl/api/authors/platon/books/';

export const fetchBooks = () => {
  return fetch(BOOKS_API_URL, { method: 'GET' })
          .then(res => res.json())
          .then(data => data.slice(0, 2))
};

export const fetchBooksData = () => wrapPromise(fetchBooks());

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
