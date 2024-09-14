import { useSWRConfig } from 'swr';

const ERROR_BOUNDARY_RESET_REASON = {
  KEYS: 'keys',
  IMPERATIVE_API: 'imperative-api',
};

const getKey = (details) => {
  switch (details.reason) {
    case ERROR_BOUNDARY_RESET_REASON.KEYS:
      return details.prev[0];
    case ERROR_BOUNDARY_RESET_REASON.IMPERATIVE_API:
      return details.args[0];
    default:
      throw Error(`Unknown ErrorBoundary reset reason: ${details.reason}`);
  }
};

const useSWRErrorBoundaryReset = () => {
  const { mutate } = useSWRConfig();
  const reset = (details) => {
    const key = getKey(details);

    mutate(key, undefined, { revalidate: true });
  };

  return { reset };
};

export default useSWRErrorBoundaryReset;
