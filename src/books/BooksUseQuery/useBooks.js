import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'

import { fetchBooksByTitle } from "../../api/books";

const useBooks = () => {
    const [title, setTitle] = useState('');
    const hasTitle = Boolean(title.trim());

    const { data: books, isFetched, isLoading, isError } = useQuery({ 
        queryKey: [title], 
        queryFn: () => fetchBooksByTitle(title), 
        enabled: hasTitle,
    });
  
    const hasBooks = Boolean(isFetched && books.length);
    const isNoBooksError = Boolean(isFetched && !books.length);

    const onChangeTitle = e => setTitle(e.target.value);

    return { 
        books, 
        isLoading, 
        isSuccess: hasBooks, 
        isEmptyTitle: !hasTitle, 
        isApiError: isError, 
        isNoBooksError, 
        title, 
        onChangeTitle,
    }
};

export default useBooks;
