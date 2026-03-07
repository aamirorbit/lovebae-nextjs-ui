import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeatureHighlights from '@/components/home/FeatureHighlights';
import AppShowcase from '@/components/home/AppShowcase';
import WidgetsSection from '@/components/home/WidgetsSection';
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
  keywords: 'couples app, best couples app, relationship app, long distance relationship app, couple games online, love letters app, couples app UK, couples app Australia, best relationship app 2026',
};

const homepageFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Lovebae?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lovebae is the #1 couples app designed for long-distance relationships and everyday love. It helps couples stay connected through mood sharing, love letters, virtual pets, couple widgets, daily check-ins, and interactive question games.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Lovebae free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Lovebae is free to download and use. It offers a free tier with core features and an optional premium subscription that unlocks advanced features for both you and your partner with a single subscription.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Lovebae work for long-distance relationships?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! Lovebae was built specifically with long-distance couples in mind. Features like mood sharing, love letters, daily check-ins, and couple games are designed to keep you connected no matter the distance. Couples in the US, UK, Australia, and 50+ countries use Lovebae daily.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Lovebae available in the UK and Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Lovebae is available worldwide including the United States, United Kingdom, Australia, Canada, and many more countries. The app works on both iOS and Android devices.',
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqJsonLd) }}
      />
      <Header />
      <HeroSection />
      <FeatureHighlights />
      <AppShowcase />
      <WidgetsSection />
      <BlogSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
