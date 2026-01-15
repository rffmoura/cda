// src/components/Layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className='min-h-screen w-full'>
      {/* Navbar Provisória */}
      <header className='p-4 border-b border-neutral-800 flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-purple-500'>GDA</h1>
        <nav className='space-x-4'>
          <a href='/' className='hover:text-purple-400'>
            Home
          </a>
          <a href='/library' className='hover:text-purple-400'>
            Library
          </a>
        </nav>
      </header>

      {/* Aqui é onde as páginas (Home, Details, etc) vão aparecer */}
      <main className='container mx-auto p-4'>
        <Outlet />
      </main>

      <footer className='p-4 text-center text-neutral-500 text-sm'>
        © 2026 Game Discovery App
      </footer>
    </div>
  );
};
