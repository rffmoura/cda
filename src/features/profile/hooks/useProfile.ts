import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthContext';
import { getProfile, updateProfile } from '../api';

export const useProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Busca os dados do perfil público
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getProfile(user!.id),
    enabled: !!user, // Só busca se tiver logado
  });

  // Mutation para atualizar
  const updateMutation = useMutation({
    mutationFn: (variables: { username?: string; full_name?: string }) =>
      updateProfile(user!.id, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });

  return {
    profile: { ...profile, email: user?.email }, // Mescla dados públicos com o email seguro
    isLoading,
    updateProfile: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
};
