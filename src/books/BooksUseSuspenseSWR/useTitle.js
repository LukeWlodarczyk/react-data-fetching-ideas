import { useState, useRef, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';

import _debounce from 'lodash/debounce';

const useTitle = () => {
    const [searchParams, setSearchParams] = useSearchParams(new URLSearchParams({ title: '' }));
    const paramTitle = searchParams.get('title') || '';
  
    const [title, setTitle] = useState(paramTitle);
  
    const dSetParamTitle = useRef(_debounce(setSearchParams, 300));
  
    useEffect(() => {
      setTitle(paramTitle);
    }, [paramTitle]);
  
    const onChange = e => {
      const newTitle = e.target.value;
      setTitle(newTitle);
      dSetParamTitle.current({ title: newTitle }, { replace: false });
    }

    return {
        title,
        paramTitle,
        onChange,
    }
};

export default useTitle;
