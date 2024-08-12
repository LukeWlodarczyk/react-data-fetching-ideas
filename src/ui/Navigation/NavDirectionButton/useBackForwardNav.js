import { useNavigate } from 'react-router-dom';

const useBackForwardNav = () => {
  const navigate = useNavigate();

  const canGoBack = Boolean(window.navigation && navigation.canGoBack);
  const canGoForward = Boolean(window.navigation && navigation.canGoForward);

  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  return {
    goBack,
    canGoBack,
    goForward,
    canGoForward,
  };
};

export default useBackForwardNav;
