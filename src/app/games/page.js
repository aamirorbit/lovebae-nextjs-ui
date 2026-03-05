import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GameCTA } from '@/components/games/GameCTA';
import GamesVideoSection from '@/components/games/GamesVideoSection';
import ShareButtons from '@/components/blog/ShareButtons';

export const metadata = {
  title: 'Free Couple Games Online — Play With Your Partner Now',
  description:
    'Play free online couple games: Truth or Dare, Would You Rather, Never Have I Ever, the 36 Questions to Fall in Love, couple quizzes, and Love Language Quiz. No signup, no download — just open and play.',
  keywords:
    'couple games online, free couple games, games for couples, truth or dare for couples, would you rather couples, never have i ever couples, couple quiz, relationship games, 36 questions to fall in love, love language quiz, date night games, couples game night',
  openGraph: {
    title: 'Free Couple Games Online — Play With Your Partner | Lovebae',
    description:
      'Truth or Dare, Would You Rather, Never Have I Ever, compatibility quizzes & more. Free, instant, no signup.',
    url: 'https://lovebae.app/games',
    siteName: 'Lovebae',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Couple Games Online | Lovebae',
    description:
      'Play free interactive games with your partner. No signup, no download — just open and play.',
  },
  alternates: {
    canonical: 'https://lovebae.app/games',
  },
};

const games = [
  {
    slug: 'truth-or-dare',
    title: 'Truth or Dare',
    subtitle: 'Couples Edition',
    description:
      'Spin the wheel and take on truths and dares with your partner. 4 intensity levels from sweet to extreme.',
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
    description:
      'Face impossible dilemmas together. See what your choices reveal about your relationship.',
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
    description:
      'Discover surprising things about each other. 3 modes from clean fun to after dark.',
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
    description:
      'Test how well you really know each other. Answer questions, compare results, and share your score.',
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
    description:
      'Based on the viral NYT experiment. 3 sets of escalating questions designed to create deep connection.',
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
    description:
      'Find out how you and your partner give and receive love. Get your personalized results.',
    players: '1-2 players',
    time: '5-10 min',
    intensity: 'Sweet',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    emoji: '💝',
    category: ['Quiz'],
  },
];

const faqs = [
  {
    question: 'Are these couple games really free?',
    answer:
      'Yes, all our couple games are 100% free. No hidden fees, no premium paywall, no signup required. Just open the game and start playing with your partner.',
  },
  {
    question: 'Do I need to download an app to play?',
    answer:
      'No download needed. All games run directly in your browser on any device — phone, tablet, or computer. Just share your screen or pass the phone between turns.',
  },
  {
    question: 'Can we play these games long distance?',
    answer:
      'Absolutely! All our games work great for long-distance couples. Just video-call your partner, open the game on one device, and play together. Games like "Would You Rather" and "36 Questions to Fall in Love" are perfect for LDR date nights.',
  },
  {
    question: 'What ages are these games for?',
    answer:
      'Our games are designed for adults aged 18 and over. We include age verification before each game. Some games offer adjustable intensity levels so you can choose content that suits your comfort level.',
  },
  {
    question: 'Which game should we play first?',
    answer:
      'If you\'re looking for a fun icebreaker, start with "Would You Rather" or "Truth or Dare" on Sweet mode. For deeper connection, try the "36 Questions to Fall in Love." To learn about each other\'s needs, take the "Love Language Quiz."',
  },
  {
    question: 'How many questions does each game have?',
    answer:
      'Each game has 100+ unique prompts across multiple categories and intensity levels. Truth or Dare has 4 levels (Sweet, Flirty, Spicy, Extreme), Never Have I Ever has 3 modes, and Would You Rather covers romantic, funny, deep, and spicy categories.',
  },
];

const howToPlay = [
  {
    step: '1',
    title: 'Pick a Game',
    description: 'Choose from Truth or Dare, Would You Rather, quizzes, and more.',
  },
  {
    step: '2',
    title: 'Set the Vibe',
    description: 'Select your intensity level — from sweet and wholesome to spicy and bold.',
  },
  {
    step: '3',
    title: 'Play Together',
    description: 'Take turns answering questions and completing challenges. Laugh, connect, repeat.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Free Couple Games Online',
  description: 'Interactive relationship games for couples — play free online with no signup.',
  numberOfItems: games.length,
  itemListElement: games.map((game, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'WebApplication',
      name: `${game.title} — Couples Edition`,
      description: game.description,
      url: `https://lovebae.app/games/${game.slug}`,
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://lovebae.app',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Couple Games',
      item: 'https://lovebae.app/games',
    },
  ],
};

export default function GamesPage() {
  return (
    <>
      <Script
        id="games-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="games-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Script
        id="games-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative overflow-hidden pt-32 pb-16">
          <div className="absolute inset-0 game-bg" />
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl" />
          <div className="absolute top-32 right-1/4 w-96 h-96 bg-rose-200/15 rounded-full blur-3xl" />
          <div className="relative container mx-auto px-4 text-center max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E7000B] mb-4">
              Free to play
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.1]">
              Free Couple Games Online
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">
              No signup. No download. Just you, your partner, and a phone. Play
              Truth or Dare, Would You Rather, compatibility quizzes, and more —
              instantly.
            </p>
            <div className="mt-6 flex justify-center">
              <ShareButtons
                url="/games"
                title="Free Couple Games Online — Play With Your Partner | Lovebae"
                description="Truth or Dare, Would You Rather, Never Have I Ever, compatibility quizzes & more. Free, instant, no signup."
              />
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="container mx-auto px-4 py-8 pb-16">
          <h2 className="sr-only">All Couple Games</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {games.map((game, i) => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="group flex flex-col rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] bg-white border border-gray-100/80"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className={`relative bg-gradient-to-br ${game.gradient} p-8 pb-10 min-h-[180px] flex flex-col justify-end`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  <div className="relative z-10">
                    <span className="text-5xl block mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                      {game.emoji}
                    </span>
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {game.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-1 font-medium">
                      {game.subtitle}
                    </p>
                  </div>
                </div>
                <div className="p-6 relative flex flex-col flex-1">
                  <div
                    className={`absolute -top-4 left-6 right-6 h-8 bg-gradient-to-br ${game.gradient} rounded-2xl blur-xl opacity-20`}
                  />
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed relative flex-1">
                    {game.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                      {game.players}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
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

        {/* How to Play */}
        <section className="py-16 bg-gray-50/60">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3 tracking-tight">
              How to Play Couple Games Online
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto">
              Get started in seconds — no account, no app, no cost.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {howToPlay.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E7000B] to-[#FF4757] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-[0_4px_16px_rgba(231,0,11,0.25)]">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video: How it works (optional, set NEXT_PUBLIC_GAMES_VIDEO_ID) */}
        <GamesVideoSection youtubeId={process.env.NEXT_PUBLIC_GAMES_VIDEO_ID} />

        {/* Why Couples Love These Games — SEO content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10 tracking-tight">
              Why Couples Love These Games
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: '💬',
                  title: 'Start Better Conversations',
                  text: 'Skip small talk and get into real, meaningful conversations with prompts designed for couples.',
                },
                {
                  icon: '🔥',
                  title: 'Adjustable Intensity',
                  text: 'From sweet and wholesome to spicy and bold — pick the vibe that matches your mood.',
                },
                {
                  icon: '🌍',
                  title: 'Perfect for Long Distance',
                  text: 'All games work over video call. Ideal for LDR date nights when you need something to do together.',
                },
                {
                  icon: '📱',
                  title: 'Works on Any Device',
                  text: 'Phone, tablet, or laptop — just open the link and play. Nothing to install.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-gray-50/80 border border-gray-100"
                >
                  <span className="text-3xl block mb-3">{item.icon}</span>
                  <h3 className="font-semibold text-gray-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-center mb-10">
              Everything you need to know about our free couple games.
            </p>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl bg-white border border-gray-100 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-left font-medium text-gray-900 hover:bg-gray-50/50 transition-colors select-none">
                    <span className="pr-4">{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Bottom Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6 tracking-tight">
              The Best Free Games for Couples
            </h2>
            <div className="prose prose-gray max-w-none text-sm leading-relaxed text-gray-500">
              <p>
                Looking for fun things to do with your partner? Lovebae offers
                the best collection of <strong>free couple games online</strong>{' '}
                — perfect for date night at home, long-distance relationship
                activities, or just a cozy evening together. Our games are
                designed to spark meaningful conversation, deepen your
                connection, and add a little excitement to your relationship.
              </p>
              <p className="mt-4">
                Play classics like{' '}
                <Link href="/games/truth-or-dare" className="text-[#E7000B] hover:underline font-medium">
                  Truth or Dare for Couples
                </Link>{' '}
                with 4 intensity levels, explore impossible choices with{' '}
                <Link href="/games/would-you-rather" className="text-[#E7000B] hover:underline font-medium">
                  Would You Rather
                </Link>
                , or discover hidden secrets with{' '}
                <Link href="/games/never-have-i-ever" className="text-[#E7000B] hover:underline font-medium">
                  Never Have I Ever
                </Link>
                . Take the famous{' '}
                <Link href="/games/36-questions" className="text-[#E7000B] hover:underline font-medium">
                  36 Questions to Fall in Love
                </Link>{' '}
                based on the viral New York Times study, test your knowledge with
                the{' '}
                <Link href="/games/couple-quiz" className="text-[#E7000B] hover:underline font-medium">
                  Couple Compatibility Quiz
                </Link>
                , or find out how you give and receive love with the{' '}
                <Link href="/games/love-language-quiz" className="text-[#E7000B] hover:underline font-medium">
                  Love Language Quiz
                </Link>
                .
              </p>
              <p className="mt-4">
                Every game is completely free, works on any device, and requires
                no signup or download. Whether you&apos;re a new couple looking
                for icebreakers, long-distance partners searching for virtual
                date ideas, or a married couple keeping the spark alive — our
                games have something for every stage of your relationship.
              </p>
            </div>
          </div>
        </section>

        <GameCTA />
      </main>
      <Footer />
    </>
  );
}
