import { useLocation } from 'react-router-dom';

const useActiveModuleName = () => {
  const { pathname } = useLocation();

  const segments = pathname.replace(/^\//, '').split('/');

  if (segments[0] !== 'modules') return null;
  if (!segments[1]) return null;

  const moduleName = segments[1];

  return moduleName;
};

export default useActiveModuleName;
