
const getBooksApiByTitle = ({ title, limit }) => `https://openlibrary.org/search.json?title=${title}&limit=${2}`;

export const BOOKS_NOT_FOUND_CODE = 'BOOKS NOT FOUND';

export const fetchBooksByTitle = async (title, { signal } = {}) => {
  const booksRes = await fetch(getBooksApiByTitle({ title, limit: 2 }), { method: 'GET', signal  });
  const booksData = await booksRes.json();

  if (booksData.numFound === 0) {
    throw { status: 404, code: BOOKS_NOT_FOUND_CODE };
  }

  return booksData.docs;
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
