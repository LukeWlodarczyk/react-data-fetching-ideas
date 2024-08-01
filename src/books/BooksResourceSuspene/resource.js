const createResource = (fetcher) => {
  let prevQuery;
  let status = 'pending';
  let response;
  let suspender;

  const createSuspender = (query) =>
    fetcher(query).then(
      (res) => {
        status = 'success';
        response = res;
      },
      (err) => {
        status = 'error';
        response = err;
      }
    );

  const reset = () => {
    prevQuery = undefined;
    status = 'pending';
    response = undefined;
    suspender = undefined;
  };

  const read = (query) => {
    if (!suspender || prevQuery !== query) {
      prevQuery = query;
      status = 'pending';
      suspender = createSuspender(query);
    }

    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw response;
      default:
        return response;
    }
  };

  return { read, reset };
};

export default createResource;
