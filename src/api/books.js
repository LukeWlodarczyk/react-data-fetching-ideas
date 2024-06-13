const BOOKS_MOCK = [
  { id: 1, name: "Harry Potter and the Philosopher's Stone" },
  { id: 2, name: "The Lord of the Rings" },
];

const pseudoRanodmDelay = () => Math.floor(Math.random() * 4) * 1000;

export const fetchBooks = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
        if (Math.random() < 0.5) {
          res(BOOKS_MOCK);
        } else {
          rej('Error while fetching books')
        }
      }, pseudoRanodmDelay())}
  );
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
