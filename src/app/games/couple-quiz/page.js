import CoupleQuizClient from './CoupleQuizClient';
import quizData from '@/content/games/couple-quiz.json';

export const metadata = {
  title: 'How Well Do You Know Your Partner Quiz',
  description: 'Free couple quiz: how well do you know your partner? Answer questions about each other, compare results, and share your score. No signup required.',
  keywords: 'couple quiz, how well do you know your partner quiz, couples quiz',
  openGraph: {
    title: 'How Well Do You Know Your Partner Quiz | Lovebae',
    description: 'Free couple compatibility quiz. Test how well you know each other.',
    url: 'https://lovebae.app/games/couple-quiz',
    type: 'website',
  },
  alternates: { canonical: 'https://lovebae.app/games/couple-quiz' },
};

export default function CoupleQuizPage() {
  return <CoupleQuizClient data={quizData} />;
}
