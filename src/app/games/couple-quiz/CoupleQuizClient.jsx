'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

function OpenGuessInput({ onGuess }) {
  const [v, setV] = useState('');
  return (
    <div className="space-y-3">
      <input
        type="text"
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="Type your answer..."
        className="w-full rounded-2xl bg-gray-50/80 border-0 px-5 py-4 text-gray-900 placeholder:text-gray-300 focus:bg-white focus:ring-2 focus:ring-[#E7000B]/20 transition-all duration-300 text-base"
        onKeyDown={(e) => e.key === 'Enter' && v.trim() && (onGuess(v), setV(''))}
      />
      <button
        onClick={() => v.trim() && (onGuess(v), setV(''))}
        className="w-full px-6 py-3.5 rounded-full font-semibold text-white text-sm bg-gradient-to-r from-[#E7000B] to-[#FF4757] shadow-[0_4px_16px_rgba(231,0,11,0.25)] btn-press transition-all duration-300"
      >
        Submit
      </button>
    </div>
  );
}

function OpenRevealInput({ onReveal }) {
  const [v, setV] = useState('');
  return (
    <div className="space-y-3">
      <input
        type="text"
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="Actual answer..."
        className="w-full rounded-2xl bg-gray-50/80 border-0 px-5 py-4 text-gray-900 placeholder:text-gray-300 focus:bg-white focus:ring-2 focus:ring-[#E7000B]/20 transition-all duration-300 text-base"
        onKeyDown={(e) => e.key === 'Enter' && v.trim() && (onReveal(v), setV(''))}
      />
      <button
        onClick={() => v.trim() && (onReveal(v), setV(''))}
        className="w-full px-6 py-3.5 rounded-full font-semibold text-white text-sm bg-gradient-to-r from-[#E7000B] to-[#FF4757] shadow-[0_4px_16px_rgba(231,0,11,0.25)] btn-press transition-all duration-300"
      >
        Reveal
      </button>
    </div>
  );
}

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PlayerSetup } from '@/components/games/PlayerSetup';
import { ProgressBar } from '@/components/games/ProgressBar';
import { SimpleCard } from '@/components/games/GameCard';
import { ShareableResult } from '@/components/games/ShareableResult';
import { GameCTA } from '@/components/games/GameCTA';
import { AgeConsent } from '@/components/games/AgeConsent';

export default function CoupleQuizClient({ data }) {
  const [players, setPlayers] = useState(null);
  const [phase, setPhase] = useState('setup');
  const [round, setRound] = useState(1);
  const [index, setIndex] = useState(0);
  const [subPhase, setSubPhase] = useState('p2_guesses');
  const [guesses, setGuesses] = useState({});
  const [reveals, setReveals] = useState({});
  const [matches, setMatches] = useState(0);

  const questions = useMemo(() => data?.questions || [], [data]);
  const half = Math.floor(questions.length / 2);
  const roundQuestions = round === 1 ? questions.slice(0, half) : questions.slice(half);
  const currentQ = roundQuestions[index];
  const totalRounds = 2;
  const totalInRound = roundQuestions.length;

  const handleStart = (names) => {
    setPlayers(names);
    setPhase('play');
    setSubPhase('p2_guesses');
    setRound(1);
    setIndex(0);
    setGuesses({});
    setReveals({});
    setMatches(0);
  };

  const handleGuess = (value) => {
    const key = `${round}-${currentQ.id}`;
    setGuesses((g) => ({ ...g, [key]: value }));
    setSubPhase('p1_reveals');
  };

  const handleReveal = (value) => {
    const key = `${round}-${currentQ.id}`;
    setReveals((r) => ({ ...r, [key]: value }));
    const guess = guesses[`${round}-${currentQ.id}`];
    const match = guess && value && String(guess).toLowerCase().trim() === String(value).toLowerCase().trim();
    if (match) setMatches((m) => m + 1);
    setSubPhase('p2_guesses');
    if (index + 1 >= totalInRound) {
      if (round < totalRounds) {
        setRound((r) => r + 1);
        setIndex(0);
        setSubPhase('p2_guesses');
      } else {
        setPhase('done');
      }
    } else {
      setIndex((i) => i + 1);
    }
  };

  const totalQuestions = questions.length;
  const scorePercent = totalQuestions > 0 ? Math.round((matches / totalQuestions) * 100) : 0;

  if (!data?.questions?.length) return null;

  const getScoreEmoji = () => {
    if (scorePercent >= 80) return '🔥';
    if (scorePercent >= 60) return '💕';
    if (scorePercent >= 40) return '😊';
    return '🤔';
  };

  return (
    <>
      <Header />
      <AgeConsent gameName="How Well Do You Know Your Partner?" />
      <main className="min-h-screen game-bg pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in-up">
            <span className="text-5xl block mb-4">💕</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">How Well Do You Know Your Partner?</h1>
            <p className="text-gray-400 text-lg">Answer about each other and see how many you get right.</p>
          </div>

          {phase === 'setup' && (
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <PlayerSetup
                playerLabels={['Partner 1', 'Partner 2']}
                title="Enter your names"
                onStart={handleStart}
              />
            </div>
          )}

          {phase === 'play' && currentQ && (
            <div className="animate-fade-in">
              <ProgressBar current={round === 1 ? index + 1 : half + index + 1} total={totalQuestions} />

              <div className="mt-4 mb-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm">
                  <span className="text-sm font-medium text-gray-600">
                    Round {round}: {round === 1 ? `${players?.p2} answers about ${players?.p1}` : `${players?.p1} answers about ${players?.p2}`}
                  </span>
                </div>
              </div>

              <SimpleCard className="mt-4">
                <p className="text-lg md:text-xl font-medium text-gray-900 mb-6 leading-relaxed">{currentQ.question}</p>

                {subPhase === 'p2_guesses' && (
                  <div className="space-y-3">
                    {currentQ.type === 'multiple' && currentQ.options ? (
                      currentQ.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleGuess(opt)}
                          className="block w-full text-left px-5 py-4 rounded-2xl bg-gray-50/80 border-0 hover:bg-[#FFF0F3] hover:shadow-[0_0_0_2px_rgba(231,0,11,0.12)] transition-all duration-300 text-gray-700 font-medium btn-press"
                        >
                          {opt}
                        </button>
                      ))
                    ) : (
                      <OpenGuessInput onGuess={handleGuess} />
                    )}
                  </div>
                )}

                {subPhase === 'p1_reveals' && (
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100">
                      <span className="text-sm text-amber-700 font-medium">
                        Guess: &quot;{guesses[`${round}-${currentQ.id}`]}&quot;
                      </span>
                    </div>
                    <div className="space-y-3">
                      {currentQ.type === 'multiple' && currentQ.options ? (
                        currentQ.options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleReveal(opt)}
                            className="block w-full text-left px-5 py-4 rounded-2xl bg-gray-50/80 border-0 hover:bg-[#FFF0F3] hover:shadow-[0_0_0_2px_rgba(231,0,11,0.12)] transition-all duration-300 text-gray-700 font-medium btn-press"
                          >
                            {opt}
                          </button>
                        ))
                      ) : (
                        <OpenRevealInput onReveal={handleReveal} />
                      )}
                    </div>
                  </div>
                )}
              </SimpleCard>
            </div>
          )}

          {phase === 'done' && (
            <div className="space-y-6 animate-scale-in">
              <SimpleCard>
                <span className="text-6xl block mb-4">{getScoreEmoji()}</span>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Results</h2>
                <p className="text-5xl font-bold bg-gradient-to-r from-[#E7000B] to-[#FF4757] bg-clip-text text-transparent">{matches} / {totalQuestions}</p>
                <p className="text-xl text-gray-400 mt-2 font-medium">{scorePercent}% match</p>
              </SimpleCard>
              <ShareableResult title="How Well Do You Know Your Partner?" score={`${matches}/${totalQuestions}`} subtitle={`We scored ${matches}/${totalQuestions}!`} />
              <div className="text-center">
                <Link
                  href="/games"
                  className="inline-flex items-center px-8 py-3.5 rounded-full font-semibold text-sm text-gray-500 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:border-gray-300 btn-press transition-all duration-300"
                >
                  Play another game
                </Link>
              </div>
            </div>
          )}

          {phase !== 'setup' && phase !== 'done' && (
            <div className="mt-10 text-center">
              <Link href="/games" className="text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium">
                ← Back to games
              </Link>
            </div>
          )}
        </div>

        <GameCTA />
      </main>
      <Footer />
    </>
  );
}
