
const getBooksApiUrlByTitle = ({ title, limit }) => `https://openlibrary.org/search.json?title=${title}&limit=${limit}`;



export const fetchBooksByTitle = async (title, { signal } = {}) => {
  const booksRes = await fetch(getBooksApiByTitle({ title, limit: 2 }), { method: 'GET', signal  });
  const booksData = await booksRes.json();


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
