import WouldYouRatherClient from './WouldYouRatherClient';
import wyrData from '@/content/games/would-you-rather.json';

export const metadata = {
  title: 'Would You Rather for Couples Online',
  description: 'Play Would You Rather for couples online. Romantic, funny, deep, and spicy dilemmas. See what other couples chose. No signup required.',
  keywords: 'would you rather couples, would you rather for couples online, couples would you rather',
  openGraph: {
    title: 'Would You Rather for Couples | Lovebae',
    description: 'Free Would You Rather game for couples. Face dilemmas together and see what other couples chose.',
    url: 'https://lovebae.app/games/would-you-rather',
    type: 'website',
  },
  alternates: { canonical: 'https://lovebae.app/games/would-you-rather' },
};

export default function WouldYouRatherPage() {
  return <WouldYouRatherClient data={wyrData} />;
}
