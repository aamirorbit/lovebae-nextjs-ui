import Script from 'next/script';
import ThirtySixQuestionsClient from './ThirtySixQuestionsClient';
import questions36Data from '@/content/games/thirty-six-questions.json';

export const metadata = {
  title: '36 Questions to Fall in Love — The Famous NYT Experiment',
  description:
    'Play the famous 36 questions to fall in love (Arthur Aron study, featured in the New York Times). 3 sets of escalating questions designed to create deep intimacy and connection. Free, no signup.',
  keywords:
    '36 questions to fall in love, NYT 36 questions, questions to fall in love, Arthur Aron 36 questions, 36 questions experiment, intimacy questions for couples',
  openGraph: {
    title: '36 Questions to Fall in Love | Lovebae',
    description:
      'The famous 36 questions designed to create closeness. Based on the viral NYT experiment. Free to play.',
    url: 'https://lovebae.app/games/36-questions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '36 Questions to Fall in Love | Lovebae',
    description: 'The viral NYT experiment — 36 questions to create deep connection. Free, no signup.',
  },
  alternates: { canonical: 'https://lovebae.app/games/36-questions' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '36 Questions to Fall in Love',
  description:
    'Free online version of the famous 36 questions to fall in love, based on Arthur Aron\'s study featured in the New York Times.',
  url: 'https://lovebae.app/games/36-questions',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Any',
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
    { '@type': 'ListItem', position: 3, name: '36 Questions to Fall in Love', item: 'https://lovebae.app/games/36-questions' },
  ],
};

export default function ThirtySixQuestionsPage() {
  return (
    <>
      <Script id="36q-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="36q-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ThirtySixQuestionsClient data={questions36Data} />
    </>
  );
}
