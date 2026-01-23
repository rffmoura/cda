import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLibraryGames, addToLibrary, removeFromLibrary, type LibraryGame } from '../api';

export const useLibrary = () => {
  const queryClient = useQueryClient();

  // Buscar jogos
  const { data: games = [], isLoading } = useQuery({
    queryKey: ['library'],
    queryFn: getLibraryGames,
  });

  // Mutation para Adicionar (com atualização otimista)
  const addMutation = useMutation({
    mutationFn: (variables: {
      id: number;
      name: string;
      image: string;
      status: LibraryGame['status'];
    }) => addToLibrary(variables.id, variables.name, variables.image, variables.status),
    onMutate: async (newGame) => {
      // Cancela queries em andamento para não sobrescrever nossa atualização otimista
      await queryClient.cancelQueries({ queryKey: ['library'] });

      // Snapshot do estado anterior
      const previousGames = queryClient.getQueryData<LibraryGame[]>(['library']);

      // Atualiza otimisticamente o cache
      queryClient.setQueryData<LibraryGame[]>(['library'], (old = []) => {
        const existingIndex = old.findIndex((g) => g.game_id === newGame.id);
        if (existingIndex >= 0) {
          // Atualiza o status do jogo existente
          const updated = [...old];
          updated[existingIndex] = { ...updated[existingIndex], status: newGame.status };
          return updated;
        }
        // Adiciona novo jogo
        return [
          {
            id: crypto.randomUUID(),
            game_id: newGame.id,
            game_name: newGame.name,
            game_image: newGame.image,
            status: newGame.status,
          },
          ...old,
        ];
      });

      return { previousGames };
    },
    onError: (_err, _newGame, context) => {
      // Em caso de erro, restaura o estado anterior
      if (context?.previousGames) {
        queryClient.setQueryData(['library'], context.previousGames);
      }
    },
    onSettled: () => {
      // Sempre revalida para garantir sincronização com o servidor
      queryClient.invalidateQueries({ queryKey: ['library'] });
    },
  });

  // Mutation para Remover (com atualização otimista)
  const removeMutation = useMutation({
    mutationFn: removeFromLibrary,
    onMutate: async (gameId) => {
      await queryClient.cancelQueries({ queryKey: ['library'] });

      const previousGames = queryClient.getQueryData<LibraryGame[]>(['library']);

      queryClient.setQueryData<LibraryGame[]>(['library'], (old = []) =>
        old.filter((g) => g.game_id !== gameId),
      );

      return { previousGames };
    },
    onError: (_err, _gameId, context) => {
      if (context?.previousGames) {
        queryClient.setQueryData(['library'], context.previousGames);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['library'] });
    },
  });

  // Helper para verificar se um jogo já está na biblioteca
  const isGameInLibrary = (gameId: number) => {
    return games.some((g) => g.game_id === gameId);
  };

  return {
    games,
    isLoading,
    addGame: addMutation.mutate,
    removeGame: removeMutation.mutate,
    isGameInLibrary,
  };
};
