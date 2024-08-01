const SuspendableResource = ({ children, resource, query }) => {
  const data = resource.read(query);
  return children(data);
};

export default SuspendableResource;
