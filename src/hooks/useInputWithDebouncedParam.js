import { useEffect } from 'react';

import useInput from './useInput';
import useDebouncedParam from './useDebouncedParam';

const useInputWithDebouncedParam = ({ debounce = 300, paramName } = {}) => {
  const param = useDebouncedParam({
    debounce,
    paramName,
    defaultValue: '',
  });

  const input = useInput({ defaultValue: param.value });

  useEffect(() => {
    input.setValue(param.value);
  }, [param.value]);

  const onChange = (e) => {
    const newValue = e.target.value;
    input.setValue(newValue);
    param.dSetSelectedParam(newValue);
  };

  return {
    input: {
      value: input.value,
      hasValue: Boolean(input.value.trim()),
      onChange,
    },
    param: {
      value: param.value,
      hasValue: Boolean(param.value.trim()),
    },
  };
};

export default useInputWithDebouncedParam;
