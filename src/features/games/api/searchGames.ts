import { api } from '../../../lib/axios';
import type { FetchGamesResponse } from '../types';

export const searchGames = async (query: string): Promise<FetchGamesResponse> => {
  const response = await api.get<FetchGamesResponse>('/games', {
    params: { search: query },
  });
  return response.data;
};
