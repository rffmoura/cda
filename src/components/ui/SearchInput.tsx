import { useState } from 'react';
import { SearchModal } from './SearchModal';
import { useSearchGames } from '../../features/games/hooks/useSearchGames';
import { SearchIcon } from '../../assets/icons/SearchIcon';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { data, isLoading, isDebouncing, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchGames(query);

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

  const results = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <>
      <div
        className={`
          group relative z-60 flex items-center gap-3
          w-full max-w-2xl px-4 py-2.5 rounded-full
          transition-all duration-200
          ${isFocused ? 'bg-white' : 'bg-neutral-700 hover:bg-white'}
        `}
      >
        <SearchIcon
          className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
            isFocused ? 'text-neutral-500' : 'text-neutral-400 group-hover:text-neutral-500'
          }`}
        />
        <input
          type='text'
          placeholder='Search games...'
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full bg-transparent outline-none
            transition-colors duration-200
            ${isFocused ? 'text-neutral-900 placeholder-neutral-500' : 'text-neutral-300 placeholder-neutral-400 group-hover:text-neutral-900 group-hover:placeholder-neutral-500'}
          `}
        />
      </div>
      <SearchModal
        isOpen={isModalOpen}
        onClose={handleClose}
        results={results}
        isLoading={isLoading || isDebouncing}
        searchQuery={query}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}
