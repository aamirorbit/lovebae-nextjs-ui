import Script from 'next/script';
import LoveLanguageQuizClient from './LoveLanguageQuizClient';
import loveLanguageData from '@/content/games/love-language.json';

export const metadata = {
  title: 'Love Language Quiz — Discover Your Love Language Free',
  description:
    'Free love language quiz. Discover your primary and secondary love languages in 5 minutes. Based on the 5 Love Languages by Gary Chapman. Take it alone or with your partner.',
  keywords:
    'love language quiz, what is my love language, 5 love languages quiz, love language test, love language quiz for couples, free love language quiz online',
  openGraph: {
    title: 'Love Language Quiz — Discover How You Love | Lovebae',
    description:
      'Discover how you give and receive love. Free 5-minute quiz based on the 5 Love Languages.',
    url: 'https://lovebae.app/games/love-language-quiz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Love Language Quiz | Lovebae',
    description: 'Find your love language in 5 minutes. Free, no signup.',
  },
  alternates: { canonical: 'https://lovebae.app/games/love-language-quiz' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Love Language Quiz',
  description:
    'Free online love language quiz based on the 5 Love Languages. Discover how you give and receive love.',
  url: 'https://lovebae.app/games/love-language-quiz',
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
    { '@type': 'ListItem', position: 3, name: 'Love Language Quiz', item: 'https://lovebae.app/games/love-language-quiz' },
  ],
};

export default function LoveLanguageQuizPage() {
  return (
    <>
      <Script id="ll-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ll-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <LoveLanguageQuizClient data={loveLanguageData} />
    </>
  );
}
