import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { Game } from '../../features/games/types';
import { useLibrary } from '../../features/library/hooks/useLibrary';
import type { LibraryGame } from '../../features/library/api';
import { Button } from './Button';
import { PlusIcon } from '../../assets/icons/PlusIcon';

export const LibraryButton = ({
  game,
  className = '',
  onLoggedOutClick,
}: {
  game: Game;
  className?: string;
  onLoggedOutClick?: () => void;
}) => {
  const { user } = useAuth();
  const { games, addGame, removeGame } = useLibrary();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const savedGame = games.find((g) => g.game_id === game.id);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (status: LibraryGame['status']) => {
    addGame({
      id: game.id,
      name: game.name,
      image: game.background_image,
      status: status,
    });
    setIsOpen(false);
  };

  const statusOptions: { label: string; value: LibraryGame['status']; color: string }[] = [
    { label: 'Playing', value: 'playing', color: 'bg-green-500' },
    { label: 'Backlog', value: 'backlog', color: 'bg-gray-500' },
    { label: 'Wishlist', value: 'wishlist', color: 'bg-blue-500' },
    { label: 'Completed', value: 'completed', color: 'bg-yellow-500' },
  ];

  if (!user) {
    return (
      <div className={className}>
        <Button variant='secondary' onClick={onLoggedOutClick}>
          <PlusIcon />
          Login to Add
        </Button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant={savedGame ? 'primary' : 'secondary'}
        className={
          savedGame ? 'bg-purple-600 hover:bg-purple-700 text-white border-transparent' : ''
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        {savedGame ? (
          <>
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
              <polyline points='20 6 9 17 4 12'></polyline>
            </svg>
            <span className='capitalize'>{savedGame.status}</span>
          </>
        ) : (
          <>
            <PlusIcon />
            Add to Library
          </>
        )}
      </Button>

      {isOpen && (
        <div className='absolute bottom-full mb-2 md:bottom-auto md:top-full md:mt-2 md:mb-0 left-0 right-0 md:right-auto md:w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100'>
          <div className='p-1'>
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAction(option.value)}
                className={`w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-700 rounded-lg flex items-center gap-3 transition-colors ${savedGame?.status === option.value ? 'bg-gray-700 font-bold text-white' : ''}`}
              >
                <span className={`w-2 h-2 rounded-full ${option.color}`} />
                {option.label}
              </button>
            ))}
          </div>
          {savedGame && (
            <div className='border-t border-gray-700 p-1'>
              <button
                onClick={() => {
                  removeGame(game.id);
                  setIsOpen(false);
                }}
                className='w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2 transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path d='M3 6h18'></path>
                  <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
                  <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
                </svg>
                Remove from Library
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
