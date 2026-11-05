import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'auto',
  className = '',
  size = 'md'
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Brand Logo Emblem */}
      <div
        className={`${iconSizes[size]} rounded-full overflow-hidden flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 shadow-sm border-2 ${
          isLight ? 'border-white/40 bg-white ring-2 ring-white/20' : 'border-[#E87924]/40 bg-white ring-2 ring-[#E87924]/10'
        }`}
        aria-hidden="true"
      >
        <img
          src="/logo.webp"
          alt="Mom's Cloud Kitchen Logo"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.endsWith('/logo.webp')) {
              target.src = '/images/logo.webp';
            } else if (target.src.endsWith('/images/logo.webp')) {
              target.src = '/images/mom_0.webp';
            } else {
              target.style.display = 'none';
            }
          }}
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-tight">
        <span
          className={`font-display font-extrabold tracking-tight ${textSizes[size]} ${
            isLight ? 'text-white' : 'text-[#28231E]'
          }`}
        >
          Mom's <span className="text-[#E87924]">Cloud Kitchen</span>
        </span>
        <span
          className={`text-[10px] uppercase font-bold tracking-[0.16em] -mt-0.5 ${
            isLight ? 'text-white/80' : 'text-[#8C4A0E]'
          }`}
        >
          Made By Mom Loved By All
        </span>
      </div>
    </div>
  );
};
