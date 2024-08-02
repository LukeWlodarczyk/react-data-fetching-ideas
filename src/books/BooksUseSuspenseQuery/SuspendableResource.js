import { useSuspenseQuery } from '@tanstack/react-query';

const SuspendableResource = ({ onSuccess, onEmpty, query, fetcher }) => {
  const { data } = useSuspenseQuery({
    queryKey: [query],
    queryFn: () => fetcher(query),
  });

  if (data.length > 0) return onSuccess(data);
  if (data.length === 0) return onEmpty();
};

export default SuspendableResource;
