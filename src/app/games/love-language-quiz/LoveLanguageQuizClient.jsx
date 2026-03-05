'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import ShareButtons from '@/components/blog/ShareButtons';
import Footer from '@/components/layout/Footer';
import { ProgressBar } from '@/components/games/ProgressBar';
import { SimpleCard } from '@/components/games/GameCard';
import { ShareableResult } from '@/components/games/ShareableResult';
import { GameCTA } from '@/components/games/GameCTA';
import { AgeConsent } from '@/components/games/AgeConsent';
import GlossaryTooltipText, { ReportDifficultWords } from '@/components/games/GlossaryTooltipText';

export default function LoveLanguageQuizClient({ data }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const questions = useMemo(() => data?.questions || [], [data]);
  const languages = useMemo(() => data?.languages || {}, [data]);
  const currentQ = questions[index];

  const handleChoose = (language) => {
    setAnswers((a) => ({ ...a, [currentQ.id]: language }));
    if (index + 1 >= questions.length) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const scores = useMemo(() => {
    const s = { words: 0, touch: 0, time: 0, gifts: 0, service: 0 };
    Object.values(answers).forEach((lang) => {
      if (s[lang] !== undefined) s[lang]++;
    });
    return s;
  }, [answers]);

  const sorted = useMemo(() => {
    return Object.entries(scores)
      .map(([key, count]) => ({ key, count, ...languages[key] }))
      .filter((x) => x.name)
      .sort((a, b) => b.count - a.count);
  }, [scores, languages]);

  const total = questions.length;
  const primary = sorted[0];
  const secondary = sorted[1];
  const primaryPercent = total > 0 && primary ? Math.round((primary.count / total) * 100) : 0;
  const secondaryPercent = total > 0 && secondary ? Math.round((secondary.count / total) * 100) : 0;

  if (!data?.questions?.length) return null;

  return (
    <>
      <Header />
      <AgeConsent gameName="Love Language Quiz" />
      <main className="min-h-screen game-bg pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10 animate-fade-in-up">
            <span className="text-5xl block mb-4">💝</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Love Language Quiz</h1>
            <p className="text-gray-400 text-lg mb-4">Discover how you give and receive love</p>
            <div className="flex justify-center">
              <ShareButtons url="/games/love-language-quiz" title="Love Language Quiz | Lovebae" />
            </div>
          </div>

          {!done && currentQ && (
            <div className="animate-fade-in">
              <ProgressBar current={index + 1} total={questions.length} />
              <SimpleCard className="mt-6">
                <p className="text-lg md:text-xl font-medium text-gray-900 mb-2 leading-relaxed">
                  <GlossaryTooltipText text={currentQ.scenario} />
                </p>
                <ReportDifficultWords context={currentQ.scenario} />
                <div className="mt-4 space-y-3">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt.language}
                      type="button"
                      onClick={() => handleChoose(opt.language)}
                      className="block w-full text-left px-5 py-4 rounded-2xl bg-gray-50/80 border-0 hover:bg-[#FFF0F3] hover:shadow-[0_0_0_2px_rgba(231,0,11,0.12)] transition-all duration-300 text-gray-700 font-medium btn-press"
                    >
                      <GlossaryTooltipText text={opt.text} />
                    </button>
                  ))}
                </div>
              </SimpleCard>
            </div>
          )}

          {done && (
            <div className="space-y-6 animate-scale-in">
              <SimpleCard>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6">Your Love Language</h2>
                {primary && (
                  <div className="mb-8">
                    <span className="text-5xl block mb-3">{primary.icon}</span>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{primary.name}</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-[#E7000B] to-[#FF4757] bg-clip-text text-transparent">{primaryPercent}%</p>
                    <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-sm mx-auto">{primary.description}</p>
                  </div>
                )}
                {secondary && (
                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">Secondary</p>
                    <span className="text-3xl block mb-2">{secondary.icon}</span>
                    <p className="text-lg font-bold text-gray-900">{secondary.name}</p>
                    <p className="text-gray-500 font-medium">{secondaryPercent}%</p>
                    <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-sm mx-auto">{secondary.description}</p>
                  </div>
                )}
              </SimpleCard>
              <ShareableResult
                title="Love Language Quiz"
                score={`${primary?.name || ''}`}
                subtitle={`My love language is ${primary?.name || ''}!`}
              />
              <div className="text-center">
                <Link
                  href="/blog/love-languages-explained"
                  className="inline-flex items-center px-8 py-3.5 rounded-full font-semibold text-sm text-gray-500 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:border-gray-300 btn-press transition-all duration-300"
                >
                  Read: The 5 Love Languages Explained →
                </Link>
              </div>
            </div>
          )}

          {!done && (
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
