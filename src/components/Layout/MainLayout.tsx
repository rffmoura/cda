// src/components/Layout/MainLayout.tsx
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { SearchInput } from '../ui/SearchInput';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { AuthModal } from '../ui/AuthModal';
import { Button } from '../ui/Button';
import { MenuIcon } from '../../assets/icons/MenuIcon';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { MobileSidebar } from '../ui/MobileSidebar';

export const MainLayout = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  return (
    <div className='min-h-screen w-full'>
      {/* Header Desktop */}
      <header className='hidden lg:flex p-4 border-b border-neutral-800 items-center gap-6'>
        <Link to='/' className='hover:opacity-80 transition flex-shrink-0'>
          <img width={80} src={logo} alt='Logo' />
        </Link>

        {/* Search - expands to fill available space */}
        <div className='flex-1 flex justify-center'>
          <SearchInput />
        </div>

        <nav className='flex items-center gap-4 flex-shrink-0'>
          {user ? (
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold uppercase'>
                {user.email?.charAt(0)}
              </div>
              <Button onClick={signOut} variant='danger' size='sm'>
                Sair
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsAuthModalOpen(true)} variant='primary' size='lg'>
              Sign In
            </Button>
          )}
        </nav>
      </header>

      {/* Header Mobile */}
      <header className='flex lg:hidden p-4 border-b border-neutral-800 items-center'>
        {isMobileSearchOpen ? (
          // Search mode
          <div className='flex items-center gap-3 w-full'>
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className='p-2 text-neutral-400 hover:text-white'
            >
              <CloseIcon className='w-5 h-5' />
            </button>
            <div className='flex-1'>
              <SearchInput />
            </div>
          </div>
        ) : (
          // Normal mode
          <>
            {/* Hamburger - only on home page */}
            {isHomePage ? (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className='p-2 text-neutral-400 hover:text-white'
              >
                <MenuIcon />
              </button>
            ) : (
              <div className='w-10' />
            )}

            {/* Centered Logo */}
            <Link to='/' className='flex-1 flex justify-center hover:opacity-80 transition'>
              <img width={60} src={logo} alt='Logo' />
            </Link>

            {/* Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className='p-2 text-neutral-400 hover:text-white'
            >
              <SearchIcon className='w-6 h-6' />
            </button>
          </>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Mobile Sidebar Drawer */}
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};
