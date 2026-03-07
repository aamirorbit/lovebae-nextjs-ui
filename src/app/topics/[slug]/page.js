import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import {
  getPostsByCategory,
  getCategoryByTopicSlug,
  getTopicSlugs,
  TOPIC_SLUG_TO_CATEGORY,
} from '@/lib/blog';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/shared/Breadcrumb';

export async function generateStaticParams() {
  const slugs = getTopicSlugs();
  return slugs.map((slug) => ({ slug }));
}

const topicDescriptions = {
  'Long Distance': {
    meta: 'Expert long-distance relationship advice, LDR tips, and strategies to stay connected across the miles. Trusted by couples in the US, UK, Australia and worldwide.',
    intro: 'Long-distance relationships are hard — but they don\'t have to be impossible. Whether you\'re separated by a few hours or a few continents, these articles cover communication tips, trust-building strategies, virtual date ideas, and real advice from couples who\'ve made it work. Lovebae is used by LDR couples across the United States, United Kingdom, Australia, and 50+ countries.',
  },
  'Date Ideas': {
    meta: 'Creative date night ideas for couples at home, outdoors, and long-distance. Budget-friendly, romantic, and fun date ideas that actually work.',
    intro: 'Stuck in a date night rut? From cosy evenings at home to adventurous outings, these articles are packed with creative, affordable, and memorable date ideas for every type of couple. Whether you\'re planning your first date or your hundredth, you\'ll find inspiration here.',
  },
  'Relationship Tips': {
    meta: 'Practical relationship tips and advice for couples at every stage. Build trust, deepen connection, and keep your relationship strong.',
    intro: 'Great relationships don\'t happen by accident — they\'re built with intention. These articles cover everything from building trust and navigating conflict to keeping the spark alive after years together. Evidence-based tips that actually work for real couples.',
  },
  'Communication': {
    meta: 'Communication tips for couples: how to talk about feelings, resolve conflict, and have deeper conversations with your partner.',
    intro: 'Communication is the foundation of every strong relationship. Learn how to express your needs, listen actively, navigate difficult conversations, and build emotional intimacy through better communication habits.',
  },
  'Questions': {
    meta: 'Deep questions, fun questions, and conversation starters for couples. Get to know your partner better with these curated question lists.',
    intro: 'Sometimes the best conversations start with the right question. From fun icebreakers to deep, thought-provoking prompts, these articles give you hundreds of questions designed to help you and your partner connect on a deeper level.',
  },
  'Gifts': {
    meta: 'Thoughtful gift ideas for your partner — romantic, sentimental, and unique gifts for every budget and occasion.',
    intro: 'Finding the perfect gift for your partner shouldn\'t be stressful. Browse our curated gift guides for anniversaries, birthdays, holidays, and "just because" moments. Thoughtful ideas that show you really know them.',
  },
  'Travel': {
    meta: 'Couples travel guides, romantic getaway ideas, and tips for travelling with your partner. Plan your next adventure together.',
    intro: 'Travelling together is one of the best ways to strengthen your relationship. Explore romantic destinations, budget travel tips, and practical advice for couples on the go — from weekend getaways to dream vacations.',
  },
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = getCategoryByTopicSlug(resolvedParams.slug);
  if (!category) return { title: 'Topic Not Found | Lovebae Blog' };

  const topicMeta = topicDescriptions[category];
  const title = `${category} Tips & Advice for Couples | Lovebae Blog`;
  const description = topicMeta?.meta || `Read our best articles about ${category.toLowerCase()} — relationship advice, date ideas, and tips for couples.`;

  return {
    title,
    description,
    keywords: `${category.toLowerCase()}, ${category.toLowerCase()} tips, ${category.toLowerCase()} for couples, ${category.toLowerCase()} advice, couples ${category.toLowerCase()}, relationship ${category.toLowerCase()}`,
    openGraph: {
      title,
      description,
      url: `https://lovebae.app/topics/${resolvedParams.slug}`,
      siteName: 'Lovebae',
      locale: 'en_US',
      alternateLocale: ['en_GB', 'en_AU'],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `https://lovebae.app/topics/${resolvedParams.slug}` },
  };
}

export default async function TopicPage({ params }) {
  const resolvedParams = await params;
  const category = getCategoryByTopicSlug(resolvedParams.slug);
  if (!category) notFound();

  const posts = getPostsByCategory(category);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lovebae.app' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://lovebae.app/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: category,
        item: `https://lovebae.app/topics/${resolvedParams.slug}`,
      },
    ],
  };

  const categoryEmojis = {
    'Travel': '✈️',
    'Gifts': '🎁',
    'Questions': '💬',
    'Date Ideas': '🏠',
    'Relationship Tips': '✨',
    'Communication': '💭',
    'Long Distance': '💕',
  };
  const emoji = categoryEmojis[category] || '❤️';

  return (
    <>
      <Script
        id="topic-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white">
        <div className="bg-gradient-to-b from-[#FFF0F5] to-white pt-32 pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <Breadcrumb items={[
                  { label: 'Home', href: '/' },
                  { label: 'Blog', href: '/blog' },
                  { label: category },
                ]} />
              </div>
              <span className="text-5xl block mb-4">{emoji}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {category}
              </h1>
              <p className="text-xl text-gray-600">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} on {category.toLowerCase()} for couples.
              </p>
            </div>
          </div>
        </div>

        {/* Topic intro for SEO */}
        {topicDescriptions[category]?.intro && (
          <div className="container mx-auto px-4 py-8 max-w-3xl">
            <p className="text-gray-500 text-sm leading-relaxed text-center">
              {topicDescriptions[category].intro}
            </p>
          </div>
        )}

        <div className="container mx-auto px-4 pb-16">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 max-w-2xl mx-auto">
              <span className="text-6xl mb-4 block">{emoji}</span>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No articles in this topic yet</h2>
              <p className="text-gray-600 mb-6">Check back soon or browse all topics.</p>
              <Link
                href="/blog"
                className="inline-flex items-center text-[#E7000B] font-semibold hover:underline"
              >
                View all blog posts
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>

        <section className="py-12 bg-gray-50/60">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Explore more topics</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.entries(TOPIC_SLUG_TO_CATEGORY).map(([slug, name]) => (
                <Link
                  key={slug}
                  href={`/topics/${slug}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    slug === resolvedParams.slug
                      ? 'bg-[#E7000B] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
