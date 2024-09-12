import { use } from 'react';

const SuspendableResource = ({ suspender, children }) => {
  const data = use(suspender);

  return children(data);
};

export default SuspendableResource;
