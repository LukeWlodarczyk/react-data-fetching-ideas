import { useState } from 'react';
import useSWR from 'swr'

import { fetchBooksByTitle } from "../../api/books";

const swrConfig = { 
    revalidateIfStale: false, 
    revalidateOnFocus: false, 
    revalidateOnReconnect: false,
};

const useBooks = () => {
    const [title, setTitle] = useState('');
    const { data: books, isLoading, error } = useSWR(title, fetchBooksByTitle, swrConfig);
  
    const isFetched = Boolean(books);
    const hasBooks = Boolean(isFetched && books.length);
    const isNoBooksError = Boolean(isFetched && !books.length);
    const isApiError = Boolean(error);
    const hasTitle = Boolean(title.trim());

    const onChangeTitle = e => setTitle(e.target.value);

    return { 
        books, 
        isLoading, 
        isSuccess: hasBooks, 
        isEmptyTitle: !hasTitle, 
        isApiError, 
        isNoBooksError, 
        title, 
        onChangeTitle,
    }
};

export default useBooks;
