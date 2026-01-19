import { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { useFilters } from '../../context/FilterContext';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

export function MobileSidebar({ isOpen, onClose, onSignIn }: MobileSidebarProps) {
  const { filters, setFilters } = useFilters();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 lg:hidden'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/80 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]'
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className='absolute left-0 top-0 h-full w-72 bg-neutral-900 border-r border-neutral-800 animate-[slideInLeft_300ms_ease-out] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-neutral-800'>
          <h2 className='font-bold text-white'>Menu</h2>
          <button onClick={onClose} className='p-2 text-neutral-400 hover:text-white'>
            <CloseIcon />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className='p-4'>
          <Sidebar
            filters={filters}
            onFilterChange={setFilters}
            onNavigate={onClose}
            onSignIn={onSignIn}
            isMobile={true}
          />
        </div>
      </div>
    </div>
  );
}
