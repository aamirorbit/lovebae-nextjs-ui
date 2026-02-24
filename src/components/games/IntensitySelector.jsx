'use client';

import { cn } from '@/lib/utils';

const levels = [
  { id: 'sweet', label: 'Sweet', emoji: '💕', desc: 'Wholesome & romantic' },
  { id: 'flirty', label: 'Flirty', emoji: '😏', desc: 'Playful & teasing' },
  { id: 'spicy', label: 'Spicy', emoji: '🌶️', desc: 'Bold & intimate' },
  { id: 'extreme', label: 'Extreme', emoji: '🔥', desc: 'For adventurous couples' },
];

export function IntensitySelector({ value, onChange, levels: customLevels }) {
  const options = customLevels || levels;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {options.map((level, i) => (
        <button
          key={level.id}
          type="button"
          onClick={() => onChange(level.id)}
          className={cn(
            'relative p-5 rounded-2xl text-left transition-all duration-300 btn-press',
            'animate-fade-in-up',
            value === level.id
              ? 'bg-gradient-to-br from-[#E7000B] to-[#FF4757] text-white shadow-[0_4px_20px_rgba(231,0,11,0.25)]'
              : 'glass-card hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
          )}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <span className="text-2xl block mb-2">{level.emoji}</span>
          <span className={cn(
            'font-semibold text-sm block',
            value === level.id ? 'text-white' : 'text-gray-900'
          )}>{level.label}</span>
          {level.desc && (
            <span className={cn(
              'block text-xs mt-1 leading-tight',
              value === level.id ? 'text-white/80' : 'text-gray-500'
            )}>{level.desc}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function ModeSelector({ value, onChange, modes }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {modes.map((mode, i) => (
        <button
          key={mode.id}
          type="button"
          onClick={() => onChange(mode.id)}
          className={cn(
            'relative p-6 rounded-2xl text-center transition-all duration-300 btn-press',
            'animate-fade-in-up',
            value === mode.id
              ? 'bg-gradient-to-br from-[#E7000B] to-[#FF4757] text-white shadow-[0_4px_20px_rgba(231,0,11,0.25)]'
              : 'glass-card hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
          )}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <span className="text-3xl block mb-2">{mode.emoji}</span>
          <span className={cn(
            'font-semibold text-sm block',
            value === mode.id ? 'text-white' : 'text-gray-900'
          )}>{mode.label}</span>
          {mode.desc && (
            <span className={cn(
              'block text-xs mt-1',
              value === mode.id ? 'text-white/80' : 'text-gray-500'
            )}>{mode.desc}</span>
          )}
        </button>
      ))}
    </div>
  );
}
