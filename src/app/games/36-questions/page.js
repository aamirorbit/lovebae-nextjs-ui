import ThirtySixQuestionsClient from './ThirtySixQuestionsClient';
import questions36Data from '@/content/games/thirty-six-questions.json';

export const metadata = {
  title: '36 Questions to Fall in Love',
  description: 'Play the famous 36 questions to fall in love (Arthur Aron study). Three sets of questions designed to create intimacy. Free, no signup.',
  keywords: '36 questions to fall in love, NYT 36 questions, questions to fall in love',
  openGraph: {
    title: '36 Questions to Fall in Love | Lovebae',
    description: 'The famous 36 questions designed to create closeness. Free to play with your partner.',
    url: 'https://lovebae.app/games/36-questions',
    type: 'website',
  },
  alternates: { canonical: 'https://lovebae.app/games/36-questions' },
};

export default function ThirtySixQuestionsPage() {
  return <ThirtySixQuestionsClient data={questions36Data} />;
}
