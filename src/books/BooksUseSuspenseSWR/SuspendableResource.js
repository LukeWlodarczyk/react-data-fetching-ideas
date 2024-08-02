import useSWR from 'swr';

const swrConfig = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const SuspendableResource = ({ onSuccess, onEmpty, query, fetcher }) => {
  const { data } = useSWR(query, fetcher, {
    ...swrConfig,
    suspense: true,
  });

  if (data.length > 0) return onSuccess(data);
  if (data.length === 0) return onEmpty();
};

export default SuspendableResource;
