import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Lovebae Blog',
    };
  }
  
  const { title, description, image, date, author, tags, category } = post.frontmatter;
  
  return {
    title: `${title} | Lovebae Blog`,
    description: description,
    keywords: tags ? tags.join(', ') : 'relationship tips, couples advice, Lovebae blog',
    authors: [{ name: author || 'Lovebae Team' }],
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      url: `https://lovebae.app/blog/${resolvedParams.slug}`,
      siteName: 'Lovebae',
      publishedTime: date,
      authors: [author || 'Lovebae Team'],
      section: category,
      tags: tags,
      // OG image is auto-generated from opengraph-image.js
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      // Twitter image is auto-generated
    },
    alternates: {
      canonical: `https://lovebae.app/blog/${resolvedParams.slug}`,
    },
  };
}

// Category to emoji/color mapping
const categoryConfig = {
  'Travel': { emoji: '✈️', color: 'from-blue-100 to-cyan-100' },
  'Gifts': { emoji: '🎁', color: 'from-pink-100 to-red-100' },
  'Questions': { emoji: '💬', color: 'from-purple-100 to-pink-100' },
  'Date Ideas': { emoji: '🏠', color: 'from-amber-100 to-orange-100' },
  'Relationship Tips': { emoji: '✨', color: 'from-rose-100 to-pink-100' },
  'Communication': { emoji: '💭', color: 'from-green-100 to-emerald-100' },
  'Long Distance': { emoji: '💕', color: 'from-purple-100 to-rose-100' },
};

const defaultConfig = { emoji: '❤️', color: 'from-red-100 to-pink-100' };

// Custom MDX components for the blog
const components = {
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6 ml-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6 ml-4">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-gray-600">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[#FF6B6B] pl-4 italic text-gray-700 my-6 bg-red-50 py-4 pr-4 rounded-r-lg">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-[#FF6B6B] hover:text-[#E55555] underline">
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),
  hr: () => (
    <hr className="border-t border-gray-200 my-8" />
  ),
};

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }
  
  const { title, category, author, date, tags } = post.frontmatter;
  const config = categoryConfig[category] || defaultConfig;
  const relatedPosts = getRelatedPosts(resolvedParams.slug, 3);
  
  const formattedDate = date 
    ? new Date(date).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })
    : '';

  // JSON-LD structured data for blog post
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: post.frontmatter.description,
    image: `https://lovebae.app/blog/${resolvedParams.slug}/opengraph-image`,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Organization',
      name: author || 'Lovebae Team',
      url: 'https://lovebae.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lovebae',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lovebae.app/assets/brand/lovebae-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lovebae.app/blog/${resolvedParams.slug}`,
    },
    keywords: tags ? tags.join(', ') : '',
    articleSection: category,
  };

  return (
    <>
      <Script
        id="blog-post-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className={`bg-gradient-to-br ${config.color} pt-32 pb-16`}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Back link */}
              <Link 
                href="/blog"
                className="inline-flex items-center text-gray-600 hover:text-[#FF6B6B] mb-6 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
              
              {/* Category badge */}
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 text-sm font-semibold px-4 py-2 rounded-full">
                  <span>{config.emoji}</span>
                  {category}
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {title}
              </h1>
              
              {/* Meta */}
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                {author && <span>By {author}</span>}
                {author && formattedDate && <span>•</span>}
                {formattedDate && <span>{formattedDate}</span>}
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Article Content */}
        <article className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <MDXRemote source={post.content} components={components} />
          </div>
        </article>
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#FF6B6B] to-[#E55555] py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to strengthen your relationship?
              </h3>
              <p className="text-white/80 mb-6">
                Download Lovebae and start connecting with your partner today.
              </p>
              <Link 
                href="/waitlist"
                className="inline-flex items-center bg-white text-[#FF6B6B] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Early Access
              </Link>
            </div>
          </div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
