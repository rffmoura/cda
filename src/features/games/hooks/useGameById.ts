import { useQuery } from '@tanstack/react-query';
import { getGameById } from '../api/getGameById';

export const useGameById = (id: number) => {
  return useQuery({
    queryKey: ['games', id],
    queryFn: () => getGameById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
