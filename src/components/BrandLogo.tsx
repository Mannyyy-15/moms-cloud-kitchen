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
          isLight ? 'border-white/30 bg-white' : 'border-[#174B35]/30 bg-white'
        }`}
        aria-hidden="true"
      >
        <img
          src="/logo.webp"
          alt="Mom's Cloud Kitchen Logo"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if logo.webp isn't loaded
            const target = e.target as HTMLElement;
            target.style.display = 'none';
          }}
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-tight">
        <span
          className={`font-display font-extrabold tracking-tight ${textSizes[size]} ${
            isLight ? 'text-white' : 'text-[#174B35]'
          }`}
        >
          Mom's <span className="text-[#E87924]">Cloud Kitchen</span>
        </span>
        <span
          className={`text-[10px] uppercase font-bold tracking-[0.2em] -mt-0.5 ${
            isLight ? 'text-[#FFF8EC]/70' : 'text-[#28231E]/60'
          }`}
        >
          Pure Veg · Vasai & Virar
        </span>
      </div>
    </div>
  );
};
