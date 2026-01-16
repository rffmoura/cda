import { api } from '../../../lib/axios';
import type { GameDetails } from '../types';

export const getGameById = async (id: number): Promise<GameDetails> => {
  const response = await api.get<GameDetails>(`/games/${id}`);
  return response.data;
};
