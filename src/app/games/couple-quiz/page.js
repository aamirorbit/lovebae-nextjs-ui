import Script from 'next/script';
import CoupleQuizClient from './CoupleQuizClient';
import quizData from '@/content/games/couple-quiz.json';

export const metadata = {
  title: 'How Well Do You Know Your Partner Quiz — Free Couple Quiz',
  description:
    'Free couple quiz: how well do you know your partner? Answer questions about each other, compare results, and share your score. 50+ questions. No signup required.',
  keywords:
    'couple quiz, how well do you know your partner quiz, couples quiz, couple compatibility quiz, relationship quiz, partner quiz online free',
  openGraph: {
    title: 'How Well Do You Know Your Partner Quiz | Lovebae',
    description:
      'Free couple compatibility quiz. Test how well you know each other and share your score.',
    url: 'https://lovebae.app/games/couple-quiz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Couple Compatibility Quiz | Lovebae',
    description: 'Test how well you know your partner. Free, no signup.',
  },
  alternates: { canonical: 'https://lovebae.app/games/couple-quiz' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'How Well Do You Know Your Partner Quiz',
  description:
    'Free online couple compatibility quiz. Answer questions about each other, compare results, and get a match score.',
  url: 'https://lovebae.app/games/couple-quiz',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Any',
  inLanguage: 'en',
  browserRequirements: 'Requires a modern web browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'Lovebae', url: 'https://lovebae.app' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lovebae.app' },
    { '@type': 'ListItem', position: 2, name: 'Couple Games', item: 'https://lovebae.app/games' },
    { '@type': 'ListItem', position: 3, name: 'Couple Quiz', item: 'https://lovebae.app/games/couple-quiz' },
  ],
};

export default function CoupleQuizPage() {
  return (
    <>
      <Script id="quiz-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="quiz-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CoupleQuizClient data={quizData} />
    </>
  );
}
