import Script from 'next/script';
import NeverHaveIEverClient from './NeverHaveIEverClient';
import nhieData from '@/content/games/never-have-i-ever.json';

export const metadata = {
  title: 'Never Have I Ever for Couples Online — Free, 3 Modes',
  description:
    'Play Never Have I Ever for couples online. Clean Fun, Flirty, and After Dark modes. 200+ unique statements. Discover surprising things about each other. No signup required.',
  keywords:
    'never have i ever couples, never have i ever questions for couples, never have i ever game online, couples never have i ever, spicy never have i ever',
  openGraph: {
    title: 'Never Have I Ever for Couples Online | Lovebae',
    description:
      'Free Never Have I Ever game for couples. Discover surprising things about each other in 3 modes.',
    url: 'https://lovebae.app/games/never-have-i-ever',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Never Have I Ever for Couples | Lovebae',
    description: 'Discover surprising things about your partner. Free, no signup.',
  },
  alternates: { canonical: 'https://lovebae.app/games/never-have-i-ever' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Never Have I Ever for Couples',
  description:
    'Free online Never Have I Ever game for couples with Clean Fun, Flirty, and After Dark modes.',
  url: 'https://lovebae.app/games/never-have-i-ever',
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
    { '@type': 'ListItem', position: 3, name: 'Never Have I Ever', item: 'https://lovebae.app/games/never-have-i-ever' },
  ],
};

export default function NeverHaveIEverPage() {
  return (
    <>
      <Script id="nhie-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="nhie-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <NeverHaveIEverClient data={nhieData} />
    </>
  );
}
