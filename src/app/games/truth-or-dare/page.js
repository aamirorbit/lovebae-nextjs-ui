import TruthOrDareClient from './TruthOrDareClient';
import todData from '@/content/games/truth-or-dare.json';

export const metadata = {
  title: 'Truth or Dare for Couples Online',
  description: 'Play Truth or Dare for couples online. Free game with 4 intensity levels — Sweet, Flirty, Spicy, Extreme. No signup required.',
  keywords: 'truth or dare couples, truth or dare for couples online, couples truth or dare',
  openGraph: {
    title: 'Truth or Dare for Couples | Lovebae',
    description: 'Free Truth or Dare game for couples. Spin the wheel and take on truths and dares together.',
    url: 'https://lovebae.app/games/truth-or-dare',
    type: 'website',
  },
  alternates: { canonical: 'https://lovebae.app/games/truth-or-dare' },
};

export default function TruthOrDarePage() {
  return <TruthOrDareClient data={todData} />;
}
