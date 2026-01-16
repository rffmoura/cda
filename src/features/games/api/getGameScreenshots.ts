import { api } from '../../../lib/axios';
import type { FetchScreenshotsResponse } from '../types';

export const getGameScreenshots = async (id: number): Promise<FetchScreenshotsResponse> => {
  const response = await api.get<FetchScreenshotsResponse>(`/games/${id}/screenshots`);
  return response.data;
};
