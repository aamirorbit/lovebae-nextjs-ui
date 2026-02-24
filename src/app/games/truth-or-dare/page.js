import Script from 'next/script';
import TruthOrDareClient from './TruthOrDareClient';
import todData from '@/content/games/truth-or-dare.json';

export const metadata = {
  title: 'Truth or Dare for Couples Online — Free, 4 Intensity Levels',
  description:
    'Play Truth or Dare for couples online. Free game with 4 intensity levels — Sweet, Flirty, Spicy, Extreme. 200+ prompts. No signup required. Perfect for date night.',
  keywords:
    'truth or dare couples, truth or dare for couples online, couples truth or dare, truth or dare questions for couples, date night truth or dare, spicy truth or dare',
  openGraph: {
    title: 'Truth or Dare for Couples Online | Lovebae',
    description:
      'Free Truth or Dare game for couples. Spin the wheel and take on truths and dares together. 4 intensity levels.',
    url: 'https://lovebae.app/games/truth-or-dare',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Truth or Dare for Couples | Lovebae',
    description: 'Spin the wheel and take on truths and dares with your partner. Free, no signup.',
  },
  alternates: { canonical: 'https://lovebae.app/games/truth-or-dare' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Truth or Dare for Couples',
  description:
    'Free online Truth or Dare game designed for couples. 4 intensity levels from sweet to extreme with 200+ unique prompts.',
  url: 'https://lovebae.app/games/truth-or-dare',
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
    { '@type': 'ListItem', position: 3, name: 'Truth or Dare', item: 'https://lovebae.app/games/truth-or-dare' },
  ],
};

export default function TruthOrDarePage() {
  return (
    <>
      <Script id="tod-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="tod-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <TruthOrDareClient data={todData} />
    </>
  );
}
