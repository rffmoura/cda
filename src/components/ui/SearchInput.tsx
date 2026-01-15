import { useState } from 'react';
import { Input } from './Input';
import { SearchModal } from './SearchModal';
import { useSearchGames } from '../../features/games/hooks/useSearchGames';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isDebouncing } = useSearchGames(query);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length >= 2) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setQuery('');
  };

  const searchIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8'></circle>
      <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
    </svg>
  );

  return (
    <>
      <div className='relative z-60'>
        <Input
          type='text'
          placeholder='Pesquise por um jogo...'
          value={query}
          onChange={handleInputChange}
          icon={searchIcon}
          className='w-80'
        />
      </div>
      <SearchModal
        isOpen={isModalOpen}
        onClose={handleClose}
        results={data?.results ?? []}
        isLoading={isLoading || isDebouncing}
        searchQuery={query}
      />
    </>
  );
}
