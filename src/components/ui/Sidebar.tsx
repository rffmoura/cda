import { Link, useLocation } from 'react-router-dom';
import type { GameFilters, SortOption } from '../../features/games/types';
import { SORT_OPTIONS, PLATFORM_OPTIONS, GENRE_OPTIONS } from '../../features/games/types';
import { useAuth } from '../../context/AuthContext';
import { Button } from './Button';

interface SidebarProps {
  filters: GameFilters;
  onFilterChange: (filters: GameFilters) => void;
  onNavigate?: () => void;
  showSignOut?: boolean;
}

export function Sidebar({
  filters,
  onFilterChange,
  onNavigate,
  showSignOut = false,
}: SidebarProps) {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    onNavigate?.();
  };
  const handleSortChange = (value: SortOption) => {
    onFilterChange({
      ...filters,
      ordering: filters.ordering === value ? undefined : value,
    });
  };

  const handlePlatformChange = (id: number) => {
    onFilterChange({
      ...filters,
      parent_platforms: filters.parent_platforms === id ? undefined : id,
    });
  };

  const handleGenreChange = (slug: string) => {
    onFilterChange({
      ...filters,
      genres: filters.genres === slug ? undefined : slug,
    });
  };

  const userLinks = [
    { to: '/library', label: 'My Library' },
    { to: '/account', label: 'Account' },
  ];

  return (
    <aside className='w-full space-y-6'>
      {/* User */}
      <div>
        <h2 className='mb-3 font-bold text-white'>User</h2>
        <ul className='space-y-1'>
          {userLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={onNavigate}
                className={`block w-full text-left px-2 py-1.5 rounded transition-colors ${
                  location.pathname === link.to
                    ? 'bg-purple-600/20 text-purple-400 font-medium'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Sort By */}
      <div>
        <h2 className='mb-3 font-bold text-white'>Sort By</h2>
        <ul className='space-y-1'>
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => handleSortChange(option.value)}
                className={`w-full text-left px-2 py-1.5 cursor-pointer rounded transition-colors ${
                  filters.ordering === option.value
                    ? 'bg-purple-600/20 text-purple-400 font-medium'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Platforms */}
      <div>
        <h2 className='mb-3 font-bold text-white'>Platforms</h2>
        <ul className='space-y-1'>
          {PLATFORM_OPTIONS.map((platform) => (
            <li key={platform.id}>
              <button
                onClick={() => handlePlatformChange(platform.id)}
                className={`w-full cursor-pointer text-left px-2 py-1.5 rounded transition-colors ${
                  filters.parent_platforms === platform.id
                    ? 'bg-purple-600/20 text-purple-400 font-medium'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {platform.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Genres */}
      <div>
        <h2 className='mb-3 font-bold text-white'>Genres</h2>
        <ul className='space-y-1'>
          {GENRE_OPTIONS.map((genre) => (
            <li key={genre.slug}>
              <button
                onClick={() => handleGenreChange(genre.slug)}
                className={`w-full cursor-pointer text-left px-2 py-1.5 rounded transition-colors ${
                  filters.genres === genre.slug
                    ? 'bg-purple-600/20 text-purple-400 font-medium'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {genre.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Clear Filters */}
      {(filters.ordering || filters.parent_platforms || filters.genres) && (
        <button
          onClick={() => onFilterChange({})}
          className='w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors'
        >
          Clear all filters
        </button>
      )}

      {/* Sign Out - mobile only */}
      {showSignOut && user && (
        <div className='pt-4 border-t border-neutral-800'>
          <Button onClick={handleSignOut} variant='danger' fullWidth>
            Sair
          </Button>
        </div>
      )}
    </aside>
  );
}
