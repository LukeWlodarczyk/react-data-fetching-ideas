import { useSWRConfig } from 'swr';

const ERROR_BOUNDARY_RESET_REASON = {
  KEYS: 'keys',
  IMPERATIVE_API: 'imperative-api',
};

const getKey = (reset) => {
  switch (reset.reason) {
    case ERROR_BOUNDARY_RESET_REASON.KEYS:
      return reset.prev[0];
    case ERROR_BOUNDARY_RESET_REASON.IMPERATIVE_API:
      return reset.args[0];
    default:
      throw Error(`Unknown ErrorBoundary reset reason: ${reset.reason}`);
  }
};

const useSWRErrorBoundaryReset = () => {
  const { mutate } = useSWRConfig();
  const reset = (reset) => {
    const key = getKey(reset);

    mutate(key, undefined, { revalidate: true });
  };

  return { reset };
};

export default useSWRErrorBoundaryReset;
