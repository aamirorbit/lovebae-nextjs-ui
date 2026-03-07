import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SuccessStoryForm from '@/components/success-stories/SuccessStoryForm';

export const metadata = {
  title: 'Couple Success Stories | Real Love Stories & Relationship Wins',
  description:
    'Read real couple success stories from Lovebae users. Long-distance wins, relationship tips, and how couples stay connected. Share your story.',
  keywords:
    'couple success stories, relationship success stories, long distance success stories, love stories, couple goals',
  openGraph: {
    title: 'Couple Success Stories | Lovebae',
    description: 'Real stories from couples who stay connected. Share your love story.',
    url: 'https://lovebae.app/success-stories',
    siteName: 'Lovebae',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Couple Success Stories | Lovebae' },
  alternates: { canonical: 'https://lovebae.app/success-stories' },
};

const seedStories = [
  {
    id: '1',
    authorName: 'Maya & Alex',
    emoji: '🌍',
    relationshipType: 'Long distance',
    duration: '2 years',
    gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
    story:
      "We've been long distance for two years. Lovebae's daily check-ins and the 36 Questions game brought us closer than ever. We finally closed the distance last month!",
    publishedAt: '2026-01-15',
  },
  {
    id: '2',
    authorName: 'Jordan',
    emoji: '💬',
    relationshipType: 'Dating',
    duration: '8 months',
    gradient: 'from-amber-400 via-orange-500 to-red-500',
    story:
      "The Love Language Quiz was a game-changer. We both discovered we need words of affirmation, and now we leave each other voice notes every morning. Simple but so meaningful.",
    publishedAt: '2026-02-01',
  },
  {
    id: '3',
    authorName: 'Sam & Riley',
    emoji: '💍',
    relationshipType: 'Engaged',
    duration: '3 years',
    gradient: 'from-rose-400 via-red-500 to-rose-600',
    story:
      "Truth or Dare on Sweet mode became our Sunday ritual. It's silly but we laugh so much and end up talking about things we wouldn't have brought up otherwise. Can't recommend enough.",
    publishedAt: '2026-02-10',
  },
];

const stats = [
  { value: '10K+', label: 'Couples connected' },
  { value: '98%', label: 'Feel closer' },
  { value: '500+', label: 'Stories shared' },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lovebae.app' },
    { '@type': 'ListItem', position: 2, name: 'Success Stories', item: 'https://lovebae.app/success-stories' },
  ],
};

const reviewJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Lovebae Couple Success Stories',
  inLanguage: 'en',
  itemListElement: seedStories.map((story, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: story.authorName,
      },
      datePublished: story.publishedAt,
      reviewBody: story.story,
      itemReviewed: {
        '@type': 'MobileApplication',
        name: 'Lovebae',
        url: 'https://lovebae.app',
      },
    },
  })),
};

export default function SuccessStoriesPage() {
  return (
    <>
      <Script
        id="success-stories-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="success-stories-reviews"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative overflow-hidden pt-32 pb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F5] via-[#FFF5F8] to-white" />
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl" />
          <div className="absolute top-32 right-1/4 w-96 h-96 bg-rose-200/15 rounded-full blur-3xl" />
          <div className="relative container mx-auto px-4 text-center max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E7000B] mb-4">
              Real couples, real stories
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.1]">
              Love Stories That Inspire
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">
              See how couples around the world stay connected, grow together, and
              keep their spark alive — in their own words.
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-y border-gray-100 bg-gray-50/60">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl md:text-3xl font-bold text-[#E7000B]">{s.value}</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stories grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3 tracking-tight">
              Featured Stories
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto">
              Every relationship is unique. Here are a few that made us smile.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {seedStories.map((s, i) => (
                <article
                  key={s.id}
                  className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-gray-100/80 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* Gradient header */}
                  <div className={`relative bg-gradient-to-br ${s.gradient} p-6 pb-8 min-h-[140px] flex flex-col justify-end`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    <div className="relative z-10">
                      <span className="text-4xl block mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                        {s.emoji}
                      </span>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {s.authorName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {s.relationshipType && (
                          <span className="text-white/70 text-sm">{s.relationshipType}</span>
                        )}
                        {s.duration && (
                          <>
                            <span className="text-white/40">·</span>
                            <span className="text-white/70 text-sm">{s.duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Story body */}
                  <div className="p-6 flex flex-col flex-1 relative">
                    <div className={`absolute -top-4 left-6 right-6 h-8 bg-gradient-to-br ${s.gradient} rounded-2xl blur-xl opacity-20`} />
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line relative flex-1">
                      &ldquo;{s.story}&rdquo;
                    </p>
                    <p className="text-xs text-gray-400 mt-4">
                      {new Date(s.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why share section */}
        <section className="py-16 bg-gray-50/60">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3 tracking-tight">
              Why Share Your Story?
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto">
              Your experience can inspire other couples going through the same thing.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: '✨',
                  title: 'Inspire Others',
                  text: 'Your story could be exactly what another couple needs to hear today.',
                },
                {
                  icon: '💕',
                  title: 'Celebrate Love',
                  text: 'Take a moment to reflect on what makes your relationship special.',
                },
                {
                  icon: '🌍',
                  title: 'Join the Community',
                  text: 'Connect with thousands of couples sharing their journey.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-white border border-gray-100 text-center"
                >
                  <span className="text-3xl block mb-3">{item.icon}</span>
                  <h3 className="font-semibold text-gray-900 mb-1.5">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Submit form */}
        <section className="py-16" id="share">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-10">
              <span className="text-5xl block mb-4">✍️</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                Share Your Story
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Tell us how you and your partner stay connected. Approved stories
                are featured on this page.
              </p>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white p-6 md:p-10 shadow-sm">
              <SuccessStoryForm />
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E7000B] via-[#D10009] to-[#FF4757]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
          <div className="relative py-16">
            <div className="container mx-auto px-4 text-center text-white max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
                Ready to write your own story?
              </h2>
              <p className="text-white/70 mb-8 text-lg">
                Download Lovebae and start building something beautiful together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/waitlist"
                  className="inline-flex items-center bg-white text-[#E7000B] px-8 py-4 rounded-full font-semibold text-base hover:bg-gray-50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] btn-press"
                >
                  Join the Waitlist
                </Link>
                <a
                  href="#share"
                  className="inline-flex items-center bg-white/15 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/25 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  Share Your Story
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
