'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function PlayerSetup({ onStart, playerLabels = ['Player 1', 'Player 2'], title = "What should we call you?" }) {
  const [names, setNames] = useState({ p1: '', p2: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({
      p1: names.p1.trim() || playerLabels[0],
      p2: names.p2.trim() || playerLabels[1],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-sm mx-auto animate-fade-in-up">
      <h2 className="text-xl font-semibold text-gray-900 text-center tracking-tight">{title}</h2>
      <div className="space-y-5">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 block">{playerLabels[0]}</span>
          <input
            type="text"
            value={names.p1}
            onChange={(e) => setNames((n) => ({ ...n, p1: e.target.value }))}
            placeholder="Name or nickname"
            className="block w-full rounded-2xl bg-gray-50/80 border-0 px-5 py-4 text-gray-900 placeholder:text-gray-300 focus:bg-white focus:ring-2 focus:ring-[#E7000B]/20 focus:shadow-[0_0_0_4px_rgba(231,0,11,0.06)] transition-all duration-300 text-base"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 block">{playerLabels[1]}</span>
          <input
            type="text"
            value={names.p2}
            onChange={(e) => setNames((n) => ({ ...n, p2: e.target.value }))}
            placeholder="Name or nickname"
            className="block w-full rounded-2xl bg-gray-50/80 border-0 px-5 py-4 text-gray-900 placeholder:text-gray-300 focus:bg-white focus:ring-2 focus:ring-[#E7000B]/20 focus:shadow-[0_0_0_4px_rgba(231,0,11,0.06)] transition-all duration-300 text-base"
          />
        </label>
      </div>
      <Button type="submit" className="w-full !rounded-full !py-4 !text-base" size="lg">
        Let's go
      </Button>
    </form>
  );
}
