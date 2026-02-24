'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export function GameCard({ front, back, flipped: controlledFlipped, onFlip }) {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const flipped = controlledFlipped !== undefined ? controlledFlipped : internalFlipped;
  const toggle = () => {
    if (onFlip) onFlip(!flipped);
    else setInternalFlipped((f) => !f);
  };

  return (
    <div
      className="w-full max-w-lg mx-auto cursor-pointer btn-press"
      style={{ perspective: '1200px' }}
      onClick={toggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && toggle()}
    >
      <div
        className="relative w-full min-h-[240px] transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className={cn(
            'absolute inset-0 rounded-3xl p-8 flex items-center justify-center text-center',
            'glass-card-strong game-glow',
            !flipped ? 'z-10' : 'invisible'
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
        </div>
        <div
          className={cn(
            'absolute inset-0 rounded-3xl p-8 flex items-center justify-center text-center',
            'bg-gradient-to-br from-[#FFF0F3] to-[#FFE4EA] border border-[#E7000B]/10',
            'shadow-[0_4px_24px_rgba(231,0,11,0.08),0_12px_48px_rgba(231,0,11,0.05)]',
            flipped ? 'z-10' : 'invisible'
          )}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

export function SimpleCard({ children, className }) {
  return (
    <div className={cn(
      'rounded-3xl p-8 text-center glass-card-strong animate-scale-in',
      className
    )}>
      {children}
    </div>
  );
}
