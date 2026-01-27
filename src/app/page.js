import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeatureHighlights from '@/components/home/FeatureHighlights';
import AppShowcase from '@/components/home/AppShowcase';
import Testimonials from '@/components/home/Testimonials';
import WidgetsSection from '@/components/home/WidgetsSection';
import QuestionsSection from '@/components/home/QuestionsSection';
import BlogSection from '@/components/home/BlogSection';
import FinalCTA from '@/components/home/FinalCTA';

// SEO Metadata for Homepage
export const metadata = {
  alternates: {
    canonical: 'https://lovebae.app',
  },
  openGraph: {
    url: 'https://lovebae.app',
  },
};

export default function Home() {
  return (
    <main className="bg-white">
      <Header />
      <HeroSection />
      <FeatureHighlights />
      <AppShowcase />
      {/* <Testimonials /> */}
      <WidgetsSection />
      {/* <QuestionsSection /> */}
      <FinalCTA />
      <Footer />
    </main>
  );
}
