import { 
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

import Books from './BooksUseQuery';

const queryClient = new QueryClient()

const ProvidedBooks = () => (
  <QueryClientProvider client={queryClient}>
    <Books />
  </QueryClientProvider>
);

export default ProvidedBooks;
