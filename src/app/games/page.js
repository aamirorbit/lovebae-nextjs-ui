import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GameCTA } from '@/components/games/GameCTA';

const games = [
  {
    slug: 'truth-or-dare',
    title: 'Truth or Dare',
    subtitle: 'Couples Edition',
    description: 'Spin the wheel and take on truths and dares with your partner. 4 intensity levels from sweet to extreme.',
    players: '2 players',
    time: '15-30 min',
    intensity: 'Adjustable',
    gradient: 'from-red-500 via-rose-500 to-pink-500',
    emoji: '🎯',
    category: ['Fun', 'Spicy'],
  },
  {
    slug: 'would-you-rather',
    title: 'Would You Rather',
    subtitle: 'Couples Edition',
    description: 'Face impossible dilemmas together. See what your choices reveal about your relationship.',
    players: '2 players',
    time: '10-20 min',
    intensity: 'Adjustable',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    emoji: '🤔',
    category: ['Fun', 'Deep'],
  },
  {
    slug: 'never-have-i-ever',
    title: 'Never Have I Ever',
    subtitle: 'Couples Edition',
    description: 'Discover surprising things about each other. 3 modes from clean fun to after dark.',
    players: '2 players',
    time: '15-30 min',
    intensity: 'Adjustable',
    gradient: 'from-amber-400 via-orange-500 to-red-500',
    emoji: '🙈',
    category: ['Fun', 'Spicy'],
  },
  {
    slug: 'couple-quiz',
    title: 'How Well Do You Know Your Partner?',
    subtitle: 'Couple Quiz',
    description: 'Test how well you really know each other. Answer questions, compare results, and share your score.',
    players: '2 players',
    time: '10-15 min',
    intensity: 'Sweet',
    gradient: 'from-pink-400 via-rose-500 to-red-400',
    emoji: '💕',
    category: ['Quiz', 'Deep'],
  },
  {
    slug: '36-questions',
    title: '36 Questions to Fall in Love',
    subtitle: 'The Famous Study',
    description: 'Based on the viral NYT experiment. 3 sets of escalating questions designed to create deep connection.',
    players: '2 players',
    time: '45 min',
    intensity: 'Deep',
    gradient: 'from-rose-400 via-red-500 to-rose-600',
    emoji: '❤️‍🔥',
    category: ['Deep', 'Quiz'],
  },
  {
    slug: 'love-language-quiz',
    title: 'Love Language Quiz',
    subtitle: 'Discover Your Love Language',
    description: 'Find out how you and your partner give and receive love. Get your personalized results.',
    players: '1-2 players',
    time: '5-10 min',
    intensity: 'Sweet',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    emoji: '💝',
    category: ['Quiz'],
  },
];

export default function GamesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative overflow-hidden pt-32 pb-16">
          <div className="absolute inset-0 game-bg" />
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl" />
          <div className="absolute top-32 right-1/4 w-96 h-96 bg-rose-200/15 rounded-full blur-3xl" />
          <div className="relative container mx-auto px-4 text-center max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E7000B] mb-4">Free to play</p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.1]">
              Couple Games
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
              No signup. No download. Just you, your partner, and a phone.
            </p>
          </div>
        </div>

        {/* Games Grid */}
        <div className="container mx-auto px-4 py-8 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {games.map((game, i) => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="group flex flex-col rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] bg-white border border-gray-100/80"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`relative bg-gradient-to-br ${game.gradient} p-8 pb-10 min-h-[180px] flex flex-col justify-end`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  <div className="relative z-10">
                    <span className="text-5xl block mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">{game.emoji}</span>
                    <h2 className="text-xl font-bold text-white leading-tight">{game.title}</h2>
                    <p className="text-white/70 text-sm mt-1 font-medium">{game.subtitle}</p>
                  </div>
                </div>
                <div className="p-6 relative flex flex-col flex-1">
                  <div className={`absolute -top-4 left-6 right-6 h-8 bg-gradient-to-br ${game.gradient} rounded-2xl blur-xl opacity-20`} />
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed relative flex-1">{game.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      {game.players}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {game.time}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full">
                      {game.intensity}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <GameCTA />
      </main>
      <Footer />
    </>
  );
}
