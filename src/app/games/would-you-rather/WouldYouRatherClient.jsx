'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SimpleCard } from '@/components/games/GameCard';
import { ProgressBar } from '@/components/games/ProgressBar';
import { GameCTA } from '@/components/games/GameCTA';
import { AgeConsent } from '@/components/games/AgeConsent';

const CATEGORIES = [
  { id: 'romantic', label: 'Romantic', emoji: '💕' },
  { id: 'funny', label: 'Funny', emoji: '😂' },
  { id: 'deep', label: 'Deep', emoji: '🤔' },
  { id: 'spicy', label: 'Spicy', emoji: '🌶️' },
];

const STATS_KEY = 'lovebae_wyr_stats';

function getStoredStats() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STATS_KEY) || '{}');
  } catch {
    return {};
  }
}

function recordChoice(pairId, choice) {
  try {
    const stats = getStoredStats();
    const key = pairId;
    if (!stats[key]) stats[key] = { a: 0, b: 0 };
    stats[key][choice]++;
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (_) {}
}

export default function WouldYouRatherClient({ data }) {
  const [category, setCategory] = useState('romantic');
  const [index, setIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [chosen, setChosen] = useState(null);

  const pairs = useMemo(() => data?.pairs?.[category] || [], [data, category]);
  const current = pairs[index];
  const pairId = current ? `${category}-${index}-${current.a.slice(0, 20)}` : null;

  const stats = useMemo(() => getStoredStats(), [category, index]);
  const choiceStats = pairId && stats[pairId] ? stats[pairId] : null;
  const totalVotes = choiceStats ? choiceStats.a + choiceStats.b : 0;
  const percentA = totalVotes > 0 ? Math.round((choiceStats.a / totalVotes) * 100) : null;
  const percentB = totalVotes > 0 ? Math.round((choiceStats.b / totalVotes) * 100) : null;

  const handleChoose = useCallback(
    (choice) => {
      if (!current || showResult) return;
      setChosen(choice);
      setShowResult(true);
      if (pairId) recordChoice(pairId, choice);
    },
    [current, showResult, pairId]
  );

  const handleNext = () => {
    setShowResult(false);
    setChosen(null);
    setIndex((i) => (i + 1) % pairs.length);
  };

  if (!data?.pairs) return null;

  return (
    <>
      <Header />
      <AgeConsent gameName="Would You Rather" />
      <main className="min-h-screen game-bg pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8 animate-fade-in-up">
            <span className="text-5xl block mb-4">🤔</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Would You Rather</h1>
            <p className="text-gray-400 text-lg mb-6">Couples Edition</p>

            {/* iOS-style segmented control */}
            <div className="inline-flex items-center p-1 rounded-full bg-gray-100/80 backdrop-blur-sm gap-0.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setCategory(cat.id);
                    setIndex(0);
                    setShowResult(false);
                    setChosen(null);
                  }}
                  className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 btn-press ${
                    category === cat.id
                      ? 'bg-white text-gray-900 shadow-[0_1px_8px_rgba(0,0,0,0.08)]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {current && (
            <div className="animate-fade-in">
              <ProgressBar current={index + 1} total={pairs.length} />

              <div className="mt-8 space-y-4">
                <button
                  type="button"
                  onClick={() => handleChoose('a')}
                  className={`w-full text-left p-6 rounded-3xl transition-all duration-300 btn-press ${
                    chosen === 'a'
                      ? 'bg-gradient-to-br from-[#FFF0F3] to-[#FFE4EA] shadow-[0_0_0_2px_rgba(231,0,11,0.2),0_4px_20px_rgba(231,0,11,0.1)]'
                      : 'glass-card-strong hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
                  }`}
                >
                  <p className="text-lg font-medium text-gray-900 leading-relaxed">{current.a}</p>
                  {showResult && totalVotes > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#E7000B] to-[#FF4757] transition-all duration-700" style={{ width: `${percentA}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-gray-500">{percentA}%</span>
                      </div>
                    </div>
                  )}
                </button>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-300">or</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

                <button
                  type="button"
                  onClick={() => handleChoose('b')}
                  className={`w-full text-left p-6 rounded-3xl transition-all duration-300 btn-press ${
                    chosen === 'b'
                      ? 'bg-gradient-to-br from-[#FFF0F3] to-[#FFE4EA] shadow-[0_0_0_2px_rgba(231,0,11,0.2),0_4px_20px_rgba(231,0,11,0.1)]'
                      : 'glass-card-strong hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
                  }`}
                >
                  <p className="text-lg font-medium text-gray-900 leading-relaxed">{current.b}</p>
                  {showResult && totalVotes > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#E7000B] to-[#FF4757] transition-all duration-700" style={{ width: `${percentB}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-gray-500">{percentB}%</span>
                      </div>
                    </div>
                  )}
                </button>
              </div>

              {showResult && (
                <div className="mt-10 flex justify-center animate-fade-in-up">
                  <button
                    onClick={handleNext}
                    className="px-10 py-4 rounded-full font-semibold text-white text-base bg-gradient-to-r from-[#E7000B] to-[#FF4757] shadow-[0_4px_20px_rgba(231,0,11,0.3)] btn-press transition-all duration-300"
                  >
                    Next question →
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/games" className="text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium">
              ← Back to games
            </Link>
          </div>
        </div>

        <GameCTA />
      </main>
      <Footer />
    </>
  );
}
