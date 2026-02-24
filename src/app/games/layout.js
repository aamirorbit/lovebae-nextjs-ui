import Script from 'next/script';

export const metadata = {
  title: 'Free Couple Games Online',
  description: 'Play free couple games online — Truth or Dare, Would You Rather, Never Have I Ever, compatibility quizzes, and more. No signup required.',
  keywords: 'couple games online, games for couples, truth or dare couples, would you rather couples, couple quiz, relationship games',
  openGraph: {
    title: 'Free Couple Games Online | Lovebae',
    description: 'Play free interactive games with your partner. Truth or Dare, Would You Rather, quizzes, and more.',
    url: 'https://lovebae.app/games',
    siteName: 'Lovebae',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Couple Games Online | Lovebae',
    description: 'Play free interactive games with your partner — no signup required.',
  },
  alternates: {
    canonical: 'https://lovebae.app/games',
  },
};

const gamesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Lovebae Couple Games',
  description: 'Free interactive games for couples — Truth or Dare, Would You Rather, quizzes, and more.',
  url: 'https://lovebae.app/games',
  publisher: {
    '@type': 'Organization',
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
