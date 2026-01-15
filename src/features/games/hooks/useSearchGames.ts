import { useQuery } from '@tanstack/react-query';
import { searchGames } from '../api/searchGames';
import { useDebounce } from '../../../hooks/useDebounce';

export const useSearchGames = (query: string) => {
  const debouncedQuery = useDebounce(query, 500);
  const isDebouncing = query !== debouncedQuery;

  const queryResult = useQuery({
    queryKey: ['games', 'search', debouncedQuery],
    queryFn: () => searchGames(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...queryResult,
    isDebouncing,
  };
};
