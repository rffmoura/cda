import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../features/profile/hooks/useProfile';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { supabase } from '../../lib/supabase';

export function Account() {
  const { user } = useAuth();
  const { profile, isLoading, updateProfile, isUpdating } = useProfile();

  // Profile form state
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Password form state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Profile message state
  const [profileMessage, setProfileMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Sync form with profile data only on first load
  useEffect(() => {
    if (profile && !isInitialized) {
      setUsername(profile.username || '');
      setFullName(profile.full_name || '');
      setIsInitialized(true);
    }
  }, [profile, isInitialized]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMessage(null);

    try {
      await updateProfile({ username: username || undefined, full_name: fullName || undefined });
      setProfileMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
    } catch {
      setProfileMessage({ type: 'error', text: 'Erro ao atualizar perfil.' });
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'A senha deve ter pelo menos 6 caracteres.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'As senhas não coincidem.' });
      return;
    }

    setPasswordLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      setPasswordMessage({ type: 'success', text: 'Senha definida com sucesso!' });
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setPasswordMessage({ type: 'error', text: 'Erro ao definir senha.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!user) {
    return (
      <div className='p-4 lg:p-10'>
        <h1 className='text-2xl font-bold mb-6'>Account</h1>
        <p className='text-neutral-400'>Please sign in to view your account details.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='p-4 lg:p-10 flex justify-center items-center min-h-[400px]'>
        <div className='w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  return (
    <div className='p-4 lg:p-10 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-8'>Account</h1>

      {/* Avatar and Email Header */}
      <div className='flex items-center gap-4 mb-8'>
        <div className='w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold uppercase'>
          {profile?.username?.charAt(0) || profile?.email?.charAt(0) || '?'}
        </div>
        <div>
          <p className='text-white font-medium'>{profile?.username || 'Sem username'}</p>
          <p className='text-neutral-400 text-sm'>{profile?.email}</p>
        </div>
      </div>

      {/* Profile Section */}
      <section className='bg-neutral-800 rounded-xl p-6 mb-6'>
        <h2 className='text-lg font-bold text-white mb-4'>Informações do Perfil</h2>

        {profileMessage && (
          <div
            className={`p-3 rounded-lg mb-4 text-sm ${
              profileMessage.type === 'success'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {profileMessage.text}
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className='space-y-4'>
          <div>
            <label className='block text-neutral-400 text-sm mb-1'>Email</label>
            <Input type='email' value={profile?.email || ''} disabled className='opacity-60' />
            <p className='text-neutral-500 text-xs mt-1'>O email não pode ser alterado.</p>
          </div>

          <div>
            <label className='block text-neutral-400 text-sm mb-1'>Username</label>
            <Input
              type='text'
              placeholder='Escolha um username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className='block text-neutral-400 text-sm mb-1'>Nome Completo</label>
            <Input
              type='text'
              placeholder='Seu nome completo'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <Button type='submit' variant='primary' disabled={isUpdating}>
            {isUpdating ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </form>
      </section>

      {/* Security Section */}
      <section className='bg-neutral-800 rounded-xl p-6'>
        <h2 className='text-lg font-bold text-white mb-2'>Segurança</h2>
        <p className='text-neutral-400 text-sm mb-4'>
          Defina uma senha para poder fazer login com email e senha além do Magic Link.
        </p>

        {passwordMessage && (
          <div
            className={`p-3 rounded-lg mb-4 text-sm ${
              passwordMessage.type === 'success'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {passwordMessage.text}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className='space-y-4'>
          <div>
            <label className='block text-neutral-400 text-sm mb-1'>Nova Senha</label>
            <Input
              isPassword
              placeholder='Mínimo 6 caracteres'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className='block text-neutral-400 text-sm mb-1'>Confirmar Senha</label>
            <Input
              isPassword
              placeholder='Repita a senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button type='submit' variant='secondary' disabled={passwordLoading}>
            {passwordLoading ? 'Definindo...' : 'Definir Senha'}
          </Button>
        </form>
      </section>
    </div>
  );
}
