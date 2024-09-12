const SuspendableResource = ({ children, resource, query, isDisabled }) => {
  let data;

  if (!isDisabled) data = resource.read(query);

  return children({ data, isDisabled });
};

export default SuspendableResource;
