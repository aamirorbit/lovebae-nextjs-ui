import LoveLanguageQuizClient from './LoveLanguageQuizClient';
import loveLanguageData from '@/content/games/love-language.json';

export const metadata = {
  title: 'Love Language Quiz',
  description: 'Free love language quiz. Discover your primary and secondary love languages in 5 minutes. Based on the 5 Love Languages.',
  keywords: 'love language quiz, what is my love language, 5 love languages quiz',
  openGraph: {
    title: 'Love Language Quiz | Lovebae',
    description: 'Discover how you give and receive love. Free 5-minute quiz.',
    url: 'https://lovebae.app/games/love-language-quiz',
    type: 'website',
  },
  alternates: { canonical: 'https://lovebae.app/games/love-language-quiz' },
};

export default function LoveLanguageQuizPage() {
  return <LoveLanguageQuizClient data={loveLanguageData} />;
}
