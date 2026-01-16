import { supabase } from '../../../lib/supabase';

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
  email?: string; // Opcional, pegaremos do Auth
}

// Buscar Perfil (retorna perfil vazio se não existir)
export const getProfile = async (userId: string): Promise<Profile> => {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

  // Se não encontrou o perfil, retorna um objeto padrão
  if (error?.code === 'PGRST116') {
    return {
      id: userId,
      username: null,
      full_name: null,
      avatar_url: null,
      updated_at: null,
    };
  }

  if (error) throw error;
  return data as Profile;
};

// Atualizar ou Criar Perfil (upsert)
export const updateProfile = async (
  userId: string,
  updates: { username?: string; full_name?: string },
) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Verificar se Username já existe (para validação em tempo real)
export const checkUsernameAvailability = async (username: string, userId: string) => {
  const { data } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .neq('id', userId) // Ignora o próprio usuário
    .single();

  // Se retornou dado, é porque já existe.
  return !data;
};
