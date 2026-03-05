'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import ShareButtons from '@/components/blog/ShareButtons';
import Footer from '@/components/layout/Footer';
import { ProgressBar } from '@/components/games/ProgressBar';
import { SimpleCard } from '@/components/games/GameCard';
import { GameCTA } from '@/components/games/GameCTA';
import { AgeConsent } from '@/components/games/AgeConsent';
import GlossaryTooltipText, { ReportDifficultWords } from '@/components/games/GlossaryTooltipText';

export default function ThirtySixQuestionsClient({ data }) {
  const [currentSetIndex, setSetIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [started, setStarted] = useState(false);

  const sets = useMemo(() => data?.sets || [], [data]);
  const currentSet = sets[currentSetIndex];
  const questions = currentSet?.questions || [];
  const currentQ = questions[questionIndex];
  const totalQuestions = sets.reduce((acc, s) => acc + (s.questions?.length || 0), 0);
  const currentGlobalIndex = sets.slice(0, currentSetIndex).reduce((acc, s) => acc + (s.questions?.length || 0), 0) + questionIndex;

  const handleStart = () => setStarted(true);

  const handleNext = () => {
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex((i) => i + 1);
    } else if (currentSetIndex + 1 < sets.length) {
      setSetIndex((i) => i + 1);
      setQuestionIndex(0);
    } else {
      setSetIndex(0);
      setQuestionIndex(0);
    }
  };

  if (!data?.sets?.length) return null;

  return (
    <>
      <Header />
      <AgeConsent gameName="36 Questions to Fall in Love" />
      <main className="min-h-screen game-bg pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10 animate-fade-in-up">
            <span className="text-5xl block mb-4">❤️‍🔥</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">36 Questions to Fall in Love</h1>
            <p className="text-gray-400 text-lg mb-4">Based on the famous Arthur Aron study</p>
            <div className="flex justify-center">
              <ShareButtons url="/games/36-questions" title="36 Questions to Fall in Love | Lovebae" />
            </div>
          </div>

          {!started ? (
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <SimpleCard>
                <p className="text-gray-500 mb-6 leading-relaxed text-base max-w-sm mx-auto">
                  Three sets of 12 questions designed to create closeness. Take turns answering. Recommended: 45 minutes with no distractions.
                </p>
                <button
                  onClick={handleStart}
                  className="px-10 py-4 rounded-full font-semibold text-white text-base bg-gradient-to-r from-[#E7000B] to-[#FF4757] shadow-[0_4px_20px_rgba(231,0,11,0.3)] hover:shadow-[0_6px_28px_rgba(231,0,11,0.4)] btn-press transition-all duration-300"
                >
                  Begin
                </button>
              </SimpleCard>
            </div>
          ) : (
            <div className="animate-fade-in">
              <ProgressBar current={currentGlobalIndex + 1} total={totalQuestions} />

              <div className="mt-4 mb-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm">
                  <span className="text-sm font-medium text-gray-600">{currentSet?.name}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-sm text-gray-400">{currentSet?.description}</span>
                </div>
              </div>

              {currentQ && (
                <SimpleCard className="mt-4">
                  <p className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed mb-2">
                    <GlossaryTooltipText text={currentQ} />
                  </p>
                  <ReportDifficultWords context={currentQ} />
                  <div className="mb-6" />
                  <button
                    onClick={handleNext}
                    className="px-10 py-4 rounded-full font-semibold text-white text-base bg-gradient-to-r from-[#E7000B] to-[#FF4757] shadow-[0_4px_20px_rgba(231,0,11,0.3)] btn-press transition-all duration-300"
                  >
                    Next question →
                  </button>
                </SimpleCard>
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
