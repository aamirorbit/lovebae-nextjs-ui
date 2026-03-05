'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GameCard } from '@/components/games/GameCard';
import { ModeSelector } from '@/components/games/IntensitySelector';
import { GameCTA } from '@/components/games/GameCTA';
import { AgeConsent } from '@/components/games/AgeConsent';
import GlossaryTooltipText, { ReportDifficultWords } from '@/components/games/GlossaryTooltipText';
import ShareButtons from '@/components/blog/ShareButtons';

const MODES = [
  { id: 'clean', label: 'Clean Fun', emoji: '😊', desc: 'Wholesome & silly' },
  { id: 'flirty', label: 'Flirty', emoji: '😏', desc: 'Playful & suggestive' },
  { id: 'afterDark', label: 'After Dark', emoji: '🌙', desc: 'Bold & intimate' },
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function NeverHaveIEverClient({ data }) {
  const [mode, setMode] = useState('clean');
  const [statement, setStatement] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [seen, setSeen] = useState(new Set());
  const [started, setStarted] = useState(false);

  const statements = useMemo(() => data?.statements?.[mode] || [], [data, mode]);
  const available = useMemo(
    () => statements.filter((_, i) => !seen.has(i)),
    [statements, seen]
  );

  const drawNew = () => {
    if (available.length === 0) {
      setSeen(new Set());
      setStatement(pickRandom(statements));
    } else {
      const idx = Math.floor(Math.random() * available.length);
      const st = available[idx];
      setStatement(st);
      const actualIdx = statements.indexOf(st);
      setSeen((s) => new Set([...s, actualIdx]));
    }
    setFlipped(false);
  };

  const handleStart = () => {
    setStarted(true);
    drawNew();
  };

  const handleDrink = (player) => {
    setScores((s) => ({ ...s, [player]: s[player] + 1 }));
  };

  return (
    <>
      <Header />
      <AgeConsent gameName="Never Have I Ever" />
      <main className="min-h-screen game-bg pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10 animate-fade-in-up">
            <span className="text-5xl block mb-4">🙈</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Never Have I Ever</h1>
            <p className="text-gray-400 text-lg mb-4">Couples Edition</p>
            <div className="flex justify-center">
              <ShareButtons url="/games/never-have-i-ever" title="Never Have I Ever for Couples | Lovebae" />
            </div>
          </div>

          {!started ? (
            <div className="space-y-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <p className="text-center text-gray-500 font-medium">Choose your mode</p>
              <ModeSelector value={mode} onChange={setMode} modes={MODES} />
              <div className="flex justify-center">
                <button
                  onClick={handleStart}
                  className="px-10 py-4 rounded-full font-semibold text-white text-base bg-gradient-to-r from-[#E7000B] to-[#FF4757] shadow-[0_4px_20px_rgba(231,0,11,0.3)] hover:shadow-[0_6px_28px_rgba(231,0,11,0.4)] btn-press transition-all duration-300"
                >
                  Start game
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              {/* Score display */}
              <div className="flex justify-center gap-4 mb-8">
                <div className="glass-card rounded-2xl px-6 py-3 text-center min-w-[120px]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Player 1</p>
                  <p className="text-2xl font-bold text-gray-900">{scores.p1}</p>
                  <p className="text-xs text-gray-400">drinks</p>
                </div>
                <div className="glass-card rounded-2xl px-6 py-3 text-center min-w-[120px]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Player 2</p>
                  <p className="text-2xl font-bold text-gray-900">{scores.p2}</p>
                  <p className="text-xs text-gray-400">drinks</p>
                </div>
              </div>

              {statement && (
                <GameCard
                  front={
                    <div>
                      <span className="text-4xl block mb-3">👀</span>
                      <p className="text-gray-400 font-medium">Tap to reveal</p>
                    </div>
                  }
                  back={
                    <p className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed">
                      <GlossaryTooltipText text={statement} />
                    </p>
                  }
                  flipped={flipped}
                  onFlip={setFlipped}
                />
              )}

              {statement && <ReportDifficultWords context={statement} />}

              <div className="mt-10 space-y-4">
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleDrink('p1')}
                    className="flex-1 max-w-[200px] px-4 py-3.5 rounded-full font-semibold text-sm text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-[#FFF0F3] hover:border-[#E7000B]/20 btn-press transition-all duration-300"
                  >
                    🍷 P1 drinks
                  </button>
                  <button
                    onClick={() => handleDrink('p2')}
                    className="flex-1 max-w-[200px] px-4 py-3.5 rounded-full font-semibold text-sm text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-[#FFF0F3] hover:border-[#E7000B]/20 btn-press transition-all duration-300"
                  >
                    🍷 P2 drinks
                  </button>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={drawNew}
                    className="px-10 py-4 rounded-full font-semibold text-white text-base bg-gradient-to-r from-[#E7000B] to-[#FF4757] shadow-[0_4px_20px_rgba(231,0,11,0.3)] btn-press transition-all duration-300"
                  >
                    Next card →
                  </button>
                </div>
              </div>
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
