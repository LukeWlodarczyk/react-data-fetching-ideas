
const getBooksApiAuthor = author => `https://openlibrary.org/search/authors.json?q=${author}`;

const getBooksApiAuthorWorks = authorId => `https://openlibrary.org/authors/${authorId}/works.json`;


export const fetchBooks = async ({ author = 'platon' }) => {
  const authorRes = await fetch(getBooksApiAuthor(author), { method: 'GET' });
  const authorData = await authorRes.json();

  const authorId = authorData.docs[0].key;

  const authorWorksRes = await fetch(getBooksApiAuthorWorks(authorId), { method: 'GET' });
  const authorWorksData = await authorWorksRes.json();

  return authorWorksData.entries.slice(0, 2);
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
