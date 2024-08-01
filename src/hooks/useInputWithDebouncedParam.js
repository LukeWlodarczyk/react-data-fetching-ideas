import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebounce from './useDebounce';

const useInputWithDebouncedParam = ({ debounce = 300, paramName } = {}) => {
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams({ [paramName]: '' })
  );
  const dSetParam = useDebounce(setSearchParams, debounce);
  const param = searchParams.get(paramName) || '';

  const [inputValue, setInputValue] = useState(param);

  useEffect(() => {
    setInputValue(param);
  }, [param]);

  const onChange = (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    dSetParam({ [paramName]: newInputValue }, { replace: false });
  };

  return {
    input: {
      value: inputValue,
      hasValue: Boolean(inputValue.trim()),
      onChange: onChange,
    },
    param: {
      value: param,
      hasValue: Boolean(param.trim()),
    },
  };
};

export default useInputWithDebouncedParam;
