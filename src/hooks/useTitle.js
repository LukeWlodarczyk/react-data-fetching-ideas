import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebounce from './useDebounce';

const useTitle = ({ debounce = 300 } = {}) => {
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams({ title: '' })
  );
  const dSetParamTitle = useDebounce(setSearchParams, debounce);
  const paramTitle = searchParams.get('title') || '';

  const [title, setTitle] = useState(paramTitle);

  useEffect(() => {
    setTitle(paramTitle);
  }, [paramTitle]);

  const onChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    dSetParamTitle({ title: newTitle }, { replace: false });
  };

  return {
    title,
    paramTitle,
    onChange,
  };
};

export default useTitle;
