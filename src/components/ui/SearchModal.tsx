import { useEffect } from 'react';
import type { Game } from '../../features/games/types';
import GameCard from './GameCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: Game[];
  isLoading: boolean;
  searchQuery: string;
}

export function SearchModal({
  isOpen,
  onClose,
  results,
  isLoading,
  searchQuery,
}: SearchModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center pt-20'>
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' onClick={onClose} />

      {/* Modal */}
      <div className='relative z-10 w-full max-w-6xl max-h-[80vh] mx-4 bg-neutral-900 rounded-xl border border-neutral-700 overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-neutral-700'>
          <h2 className='text-lg font-semibold'>
            {isLoading ? 'Buscando...' : `Resultados para "${searchQuery}" (${results.length})`}
          </h2>
          <button
            onClick={onClose}
            className='p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className='p-4 overflow-y-auto max-h-[calc(80vh-80px)]'>
          {isLoading ? (
            <div className='flex items-center justify-center py-12'>
              <div className='w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin' />
            </div>
          ) : results.length === 0 ? (
            <div className='text-center py-12 text-neutral-400'>
              Nenhum jogo encontrado para "{searchQuery}"
            </div>
          ) : (
            <div className='grid grid-cols-4 gap-4'>
              {results.map((game) => (
                <div key={game.id} onClick={onClose}>
                  <GameCard {...game} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
