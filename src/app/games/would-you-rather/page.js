import Script from 'next/script';
import WouldYouRatherClient from './WouldYouRatherClient';
import wyrData from '@/content/games/would-you-rather.json';

export const metadata = {
  title: 'Would You Rather for Couples Online — Free Dilemma Game',
  description:
    'Play Would You Rather for couples online. Romantic, funny, deep, and spicy dilemmas. See what other couples chose. 150+ questions. No signup required.',
  keywords:
    'would you rather couples, would you rather for couples online, couples would you rather, would you rather questions couples, romantic would you rather, date night game',
  openGraph: {
    title: 'Would You Rather for Couples Online | Lovebae',
    description:
      'Free Would You Rather game for couples. Face dilemmas together and see what other couples chose.',
    url: 'https://lovebae.app/games/would-you-rather',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Would You Rather for Couples | Lovebae',
    description: 'Face impossible dilemmas together. Free, no signup.',
  },
  alternates: { canonical: 'https://lovebae.app/games/would-you-rather' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Would You Rather for Couples',
  description:
    'Free online Would You Rather game with romantic, funny, deep, and spicy dilemmas for couples.',
  url: 'https://lovebae.app/games/would-you-rather',
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
    { '@type': 'ListItem', position: 3, name: 'Would You Rather', item: 'https://lovebae.app/games/would-you-rather' },
  ],
};

export default function WouldYouRatherPage() {
  return (
    <>
      <Script id="wyr-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="wyr-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <WouldYouRatherClient data={wyrData} />
    </>
  );
}
