'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SpinWheel } from '@/components/games/SpinWheel';
import { IntensitySelector } from '@/components/games/IntensitySelector';
import { PlayerSetup } from '@/components/games/PlayerSetup';
import { SimpleCard } from '@/components/games/GameCard';
import { GameCTA } from '@/components/games/GameCTA';
import { AgeConsent } from '@/components/games/AgeConsent';
import GlossaryTooltipText, { ReportDifficultWords } from '@/components/games/GlossaryTooltipText';
import ShareButtons from '@/components/blog/ShareButtons';

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function replacePlayer(text, name) {
  return text.replace(/\{player\}/g, name || 'your partner');
}

export default function TruthOrDareClient({ data }) {
  const [step, setStep] = useState('level');
  const [level, setLevel] = useState('sweet');
  const [players, setPlayers] = useState(null);
  const [resultType, setResultType] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [turn, setTurn] = useState(0);

  const truths = useMemo(() => data?.truths?.[level] || [], [data, level]);
  const dares = useMemo(() => data?.dares?.[level] || [], [data, level]);

  const currentPlayerName = players ? (turn % 2 === 0 ? players.p1 : players.p2) : 'Your partner';
  const otherPlayerName = players ? (turn % 2 === 0 ? players.p2 : players.p1) : 'your partner';

  const handleSpinResult = (result) => {
    setResultType(result);
    const pool = result === 'truth' ? truths : dares;
    const text = pickRandom(pool);
    setCurrentPrompt(text ? replacePlayer(text, otherPlayerName) : 'No prompts available for this level.');
  };

  const handleNext = () => {
    setResultType(null);
    setCurrentPrompt(null);
    setTurn((t) => t + 1);
  };

  return (
    <>
      <Header />
      <AgeConsent gameName="Truth or Dare" />
      <main className="min-h-screen game-bg pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {step === 'level' && (
            <div className="space-y-10 animate-fade-in-up">
              <div className="text-center">
                <span className="text-5xl block mb-4">🎯</span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Truth or Dare</h1>
                <p className="text-gray-400 text-lg mb-4">Pick your vibe</p>
                <div className="flex justify-center">
                  <ShareButtons url="/games/truth-or-dare" title="Truth or Dare for Couples | Lovebae" />
                </div>
              </div>
              <IntensitySelector value={level} onChange={setLevel} />
              <div className="flex justify-center">
                <button
                  onClick={() => setStep('players')}
                  className="px-10 py-4 rounded-full font-semibold text-white text-base bg-gradient-to-r from-[#E7000B] to-[#FF4757] shadow-[0_4px_20px_rgba(231,0,11,0.3)] hover:shadow-[0_6px_28px_rgba(231,0,11,0.4)] btn-press transition-all duration-300"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 'players' && (
            <div className="space-y-10 animate-fade-in-up">
              <div className="text-center">
                <span className="text-5xl block mb-4">👫</span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Who&apos;s playing?</h1>
                <p className="text-gray-400">We&apos;ll use these names in the prompts</p>
              </div>
              <PlayerSetup
                playerLabels={['Your name', "Partner's name"]}
                title="Enter your names (or nicknames)"
                onStart={(names) => {
                  setPlayers(names);
                  setStep('play');
                }}
              />
              <div className="text-center">
                <button
                  onClick={() => setStep('level')}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium"
                >
                  ← Back
                </button>
              </div>
            </div>
          )}

          {step === 'play' && (
            <div className="space-y-10">
              <div className="text-center animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-[#E7000B] animate-pulse" />
                  <span className="text-sm font-medium text-gray-600">{currentPlayerName}&apos;s turn</span>
                </div>
              </div>

              {!resultType && (
                <div className="animate-scale-in">
                  <SpinWheel onResult={handleSpinResult} />
                </div>
              )}

              {resultType && currentPrompt && (
                <div className="animate-scale-in">
                  <SimpleCard>
                    <div className="mb-4">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                        resultType === 'truth'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-red-50 text-[#E7000B]'
                      }`}>
                        {resultType}
                      </span>
                    </div>
                    <p className="text-xl md:text-2xl text-gray-900 leading-relaxed font-medium">
                      <GlossaryTooltipText text={currentPrompt} />
                    </p>
                    <ReportDifficultWords context={currentPrompt} />
                  </SimpleCard>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                    <button
                      onClick={handleNext}
                      className="px-8 py-4 rounded-full font-semibold text-white text-base bg-gradient-to-r from-[#E7000B] to-[#FF4757] shadow-[0_4px_20px_rgba(231,0,11,0.3)] btn-press transition-all duration-300"
                    >
                      Next turn →
                    </button>
                    <button
                      onClick={() => { setResultType(null); setCurrentPrompt(null); }}
                      className="px-8 py-4 rounded-full font-semibold text-sm text-gray-500 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:border-gray-300 btn-press transition-all duration-300"
                    >
                      Spin again
                    </button>
                  </div>
                </div>
              )}

              {!resultType && (
                <div className="text-center">
                  <Link href="/games" className="text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium">
                    ← Back to games
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        <GameCTA />
      </main>
      <Footer />
    </>
  );
}
