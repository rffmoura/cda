import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from './Button';
import { Input } from './Input';
import { CloseIcon } from '../../assets/icons/CloseIcon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'magic' | 'signin' | 'signup'>('signin');
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMode('signin');
      setEmail('');
      setPassword('');
      setMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === 'magic') {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Cheque seu email para o link mágico!' });
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Conta criada! Verifique seu email.' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onClose();
      }
    } catch (error: unknown) {
      console.error('error', error);
      setMessage({ type: 'error', text: 'Ocorreu um erro' });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setMode('signin');
    setMessage(null);
  };

  return (
    <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm'>
      <div className='bg-neutral-800 rounded-xl p-6 w-full max-w-md shadow-2xl border border-neutral-700 relative'>
        {/* Close button */}
        <Button onClick={onClose} variant='icon' size='icon' className='absolute top-4 right-4'>
          <CloseIcon />
        </Button>

        {/* Back button - shown when not on signin */}
        {mode !== 'signin' && (
          <Button
            onClick={handleBack}
            variant='icon'
            size='icon'
            className='absolute top-4 left-4 '
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </Button>
        )}

        <h2 className='text-2xl font-bold text-white mb-6 text-center'>
          {mode === 'magic' ? 'Magic Link' : mode === 'signup' ? 'Crie sua conta' : 'Bem-vindo(a)!'}
        </h2>

        {message && (
          <div
            className={`p-3 rounded-lg mb-4 text-sm ${
              message.type === 'success'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleAuth} className='space-y-4'>
          <div>
            <label className='block text-neutral-400 text-sm mb-1'>Email</label>
            <Input
              type='email'
              required
              placeholder='seu@email.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {mode !== 'magic' && (
            <div>
              <label className='block text-neutral-400 text-sm mb-1'>Senha</label>
              <Input
                isPassword
                required
                placeholder='********'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          <Button type='submit' disabled={loading} variant='primary' fullWidth>
            {loading
              ? 'Processando...'
              : mode === 'magic'
                ? 'Enviar Link'
                : mode === 'signup'
                  ? 'Cadastrar'
                  : 'Entrar'}
          </Button>
        </form>

        <div className='mt-6 flex flex-col gap-2 text-sm text-center'>
          {mode === 'signin' && (
            <>
              <Button variant='link' onClick={() => setMode('signup')}>
                Não tem conta? Cadastre-se
              </Button>
              <Button variant='link' onClick={() => setMode('magic')}>
                Esqueci a senha / Usar Magic Link
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
