import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function Input({ icon, className = '', ...props }: InputProps) {
  return (
    <div className='relative'>
      {icon && (
        <div className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400'>{icon}</div>
      )}
      <input
        className={`w-full bg-neutral-800 border border-neutral-700 rounded-lg py-2 px-4 ${icon ? 'pl-10' : ''} text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
