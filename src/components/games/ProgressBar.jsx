'use client';

import { cn } from '@/lib/utils';

export function ProgressBar({ current, total, className }) {
  const percent = total > 0 ? Math.min(100, (current / total) * 100) : 0;
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-400 tracking-wide">{current} of {total}</span>
        <span className="text-xs font-medium text-gray-400">{Math.round(percent)}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-[#E7000B] to-[#FF4757]"
          style={{
            width: `${percent}%`,
            boxShadow: percent > 0 ? '0 0 8px rgba(231,0,11,0.3)' : 'none',
          }}
        />
      </div>
    </div>
  );
}

export function ProgressText({ current, total, label }) {
  return (
    <p className="text-sm text-gray-400 font-medium tracking-wide">
      {label || `Question ${current} of ${total}`}
    </p>
  );
}
