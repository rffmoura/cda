import { supabase } from '../../../lib/supabase';

export interface LibraryGame {
  id: string; // ID do banco de dados (uuid)
  game_id: number; // ID da RAWG
  status: 'backlog' | 'playing' | 'completed' | 'wishlist';
  game_name: string;
  game_image: string;
}

// Adicionar ou atualizar jogo na biblioteca
export const addToLibrary = async (
  gameId: number,
  name: string,
  image: string,
  status: LibraryGame['status'],
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Usuário não autenticado');

  const { data, error } = await supabase
    .from('user_games')
    .upsert(
      {
        user_id: user.id,
        game_id: gameId,
        game_name: name,
        game_image: image,
        status: status,
      },
      {
        onConflict: 'user_id,game_id',
      },
    )
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Remover jogo (pelo ID da RAWG para facilitar)
export const removeFromLibrary = async (gameId: number) => {
  const { error } = await supabase.from('user_games').delete().eq('game_id', gameId); // O RLS garante que só apaga se for do user atual

  if (error) throw error;
};

// Buscar todos os jogos do usuário
export const getLibraryGames = async () => {
  const { data, error } = await supabase
    .from('user_games')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as LibraryGame[];
};
