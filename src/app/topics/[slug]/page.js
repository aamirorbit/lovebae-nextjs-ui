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

export async function generateStaticParams() {
  const slugs = getTopicSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = getCategoryByTopicSlug(resolvedParams.slug);
  if (!category) return { title: 'Topic Not Found | Lovebae Blog' };

  const title = `${category} | Lovebae Blog`;
  const description = `Read our best articles about ${category.toLowerCase()} — relationship advice, date ideas, and tips for couples.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://lovebae.app/topics/${resolvedParams.slug}`,
      siteName: 'Lovebae',
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
              <Link
                href="/blog"
                className="inline-flex items-center text-gray-600 hover:text-[#E7000B] mb-6 transition-colors text-sm"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
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
