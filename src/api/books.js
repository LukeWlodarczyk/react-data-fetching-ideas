const BOOKS_MOCK = [
  { id: 1, name: "Hello" },
  { id: 2, name: "World" },
];

const pseudoRanodmDelay = () => Math.floor(Math.random() * 8) * 1000;

export const fetchBooks = () => {
  return new Promise((res, rej) =>
    setTimeout(() => {
      // if (Math.random() < 0.5) res(BOOKS_MOCK);
      // rej('Error while fetching books')
      
      res(BOOKS_MOCK);
    }, pseudoRanodmDelay())
  );
};
