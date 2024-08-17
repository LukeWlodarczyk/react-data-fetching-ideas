import { useSearchParams } from 'react-router-dom';
import useDebounce from './useDebounce';

const useDebouncedParam = ({ paramName, debounce, defaultValue }) => {
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams({ [paramName]: '' })
  );
  const dSetParam = useDebounce(setSearchParams, debounce);
  const param = searchParams.get(paramName) || defaultValue;

  const dSetSelectedParam = (value) => {
    dSetParam({ [paramName]: value }, { replace: false });
  };

  return {
    value: param,
    dSetSelectedParam,
  };
};

export default useDebouncedParam;
