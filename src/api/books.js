
const getBooksApiAuthor = author => `https://openlibrary.org/search/authors.json?q=${author}`;

const getBooksApiAuthorWorks = authorId => `https://openlibrary.org/authors/${authorId}/works.json`;


export const AUTHOR_NOT_FOUND_CODE = 'AUTHOR NOT FOUND';
export const BOOKS_NOT_FOUND_CODE = 'BOOKS NOT FOUND';

export const fetchAuthors = async ({ author }) => {
  const authorRes = await fetch(getBooksApiAuthor(author), { method: 'GET' });
  const authorData = await authorRes.json();

  if (authorData.numFound === 0) {
    throw { status: 404, code: AUTHOR_NOT_FOUND_CODE };
  }

  return authorData.docs;
};

export const fetchBooks = async ({ authorId }) => {
  const authorWorksRes = await fetch(getBooksApiAuthorWorks(authorId), { method: 'GET' });
  const authorWorksData = await authorWorksRes.json();

  if (authorWorksData.size === 0) {
    throw { status: 404, code: BOOKS_NOT_FOUND_CODE };
  }

  return authorWorksData.entries;
};

export const fetchBooksByAuthor = async (author = 'platon') => {
  const authors = await fetchAuthors({ author });

  const firstAuthorId = authors[0].key;

  const books = await fetchBooks({ authorId: firstAuthorId });

  return books.slice(0, 2);
}

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
