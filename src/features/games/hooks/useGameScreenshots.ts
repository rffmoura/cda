import { useQuery } from '@tanstack/react-query';
import { getGameScreenshots } from '../api/getGameScreenshots';

export const useGameScreenshots = (id: number) => {
  return useQuery({
    queryKey: ['screenshots', id],
    queryFn: () => getGameScreenshots(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
