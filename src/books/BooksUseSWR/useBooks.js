import useSWR from 'swr'

import useTitle from '@/hooks/useTitle';

import { fetchBooksByTitle } from "@/api/books";

const swrConfig = { 
    revalidateIfStale: false, 
    revalidateOnFocus: false, 
    revalidateOnReconnect: false,
};

const useBooks = () => {
    const { title, onChange, paramTitle } = useTitle();
    const { data: books, isLoading, error } = useSWR(paramTitle, fetchBooksByTitle, swrConfig);
  
    const isFetched = Boolean(books);
    const hasBooks = Boolean(isFetched && books.length);
    const isNoBooksError = Boolean(isFetched && !books.length);
    const isApiError = Boolean(error);
    const hasTitle = Boolean(title.trim());

    return { 
        books, 
        isLoading, 
        isSuccess: hasBooks, 
        isEmptyTitle: !hasTitle, 
        isApiError, 
        isNoBooksError, 
        title, 
        onChangeTitle: onChange,
    }
};

export default useBooks;
