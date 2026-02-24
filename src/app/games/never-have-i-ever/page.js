import NeverHaveIEverClient from './NeverHaveIEverClient';
import nhieData from '@/content/games/never-have-i-ever.json';

export const metadata = {
  title: 'Never Have I Ever for Couples Online',
  description: 'Play Never Have I Ever for couples online. Clean Fun, Flirty, and After Dark modes. No signup required.',
  keywords: 'never have i ever couples, never have i ever questions for couples',
  openGraph: {
    title: 'Never Have I Ever for Couples | Lovebae',
    description: 'Free Never Have I Ever game for couples. Discover surprising things about each other.',
    url: 'https://lovebae.app/games/never-have-i-ever',
    type: 'website',
  },
  alternates: { canonical: 'https://lovebae.app/games/never-have-i-ever' },
};

export default function NeverHaveIEverPage() {
  return <NeverHaveIEverClient data={nhieData} />;
}
