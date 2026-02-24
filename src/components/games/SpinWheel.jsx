'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const SEGMENTS = ['Truth', 'Dare'];

export function SpinWheel({ onResult }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [lastResult, setLastResult] = useState(null);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    const extraRotations = 4 + Math.random() * 4;
    const segmentAngle = 360 / SEGMENTS.length;
    const randomSegment = Math.floor(Math.random() * SEGMENTS.length);
    const finalAngle = 360 * extraRotations + randomSegment * segmentAngle + segmentAngle / 2;
    setRotation((r) => r + finalAngle);
    const result = SEGMENTS[randomSegment].toLowerCase();
    setLastResult(result);
    setTimeout(() => {
      setSpinning(false);
      onResult(result);
    }, 3500);
  }, [spinning, onResult]);

  return (
    <div className="flex flex-col items-center gap-8 animate-scale-in">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-[#E7000B]/20 to-[#FF4757]/10 blur-xl" />

        <div
          className={cn(
            'relative w-52 h-52 rounded-full',
            'bg-gradient-to-br from-[#E7000B] via-[#FF4757] to-[#FF6B7A]',
            'shadow-[0_8px_32px_rgba(231,0,11,0.3),inset_0_2px_4px_rgba(255,255,255,0.2)]',
            'p-[6px]',
            spinning && 'transition-transform duration-[3500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]'
          )}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="w-full h-full rounded-full bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden">
            {SEGMENTS.map((label) => (
              <span
                key={label}
                className="flex-1 flex items-center justify-center text-lg font-bold tracking-wide text-gray-800 w-full border-b last:border-b-0 border-gray-100"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Pointer */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10">
          <div
            className="w-0 h-0 drop-shadow-lg"
            style={{
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '18px solid #E7000B',
              filter: 'drop-shadow(0 2px 4px rgba(231,0,11,0.3))',
            }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={spin}
        disabled={spinning}
        className={cn(
          'px-10 py-4 rounded-full font-semibold text-white text-lg tracking-wide',
          'bg-gradient-to-r from-[#E7000B] to-[#FF4757]',
          'shadow-[0_4px_20px_rgba(231,0,11,0.3)]',
          'hover:shadow-[0_6px_28px_rgba(231,0,11,0.4)]',
          'btn-press transition-all duration-300',
          spinning && 'opacity-60 cursor-not-allowed scale-95'
        )}
      >
        {spinning ? 'Spinning...' : 'Spin the wheel'}
      </button>
    </div>
  );
}
