import Script from 'next/script';

const gamesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free Couple Games Online',
  description:
    'Play free interactive couple games online — Truth or Dare, Would You Rather, Never Have I Ever, compatibility quizzes, and more. No signup required.',
  url: 'https://lovebae.app/games',
  inLanguage: 'en',
  publisher: {
    '@type': 'Organization',
    name: 'Lovebae',
    url: 'https://lovebae.app',
    logo: {
      '@type': 'ImageObject',
      url: 'https://lovebae.app/assets/brand/lovebae-logo.png',
    },
  },
  isPartOf: {
    '@type': 'WebSite',
    name: 'Lovebae',
    url: 'https://lovebae.app',
  },
};

export default function GamesLayout({ children }) {
  return (
    <>
      <Script
        id="games-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gamesJsonLd) }}
      />
      {children}
    </>
  );
}
