import React, { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import BlogSearch from '@/components/blog/BlogSearch';
import CategoryFilter from '@/components/blog/CategoryFilter';
import { getAllPosts, getAllCategories, searchPosts } from '@/lib/blog';

export const metadata = {
  title: 'Lovebae Blog | Relationship Tips, Date Ideas & Couples Advice',
  description: 'Discover relationship tips, romantic date ideas, long-distance relationship advice, and expert guidance to help you and your partner grow closer every day.',
  keywords: 'relationship tips, date ideas, couples advice, long distance relationship, relationship blog, love advice, couples activities, romantic ideas',
  openGraph: {
    title: 'Lovebae Blog | Relationship Tips & Couples Advice',
    description: 'Discover relationship tips, romantic date ideas, and expert guidance for couples. Strengthen your bond with Lovebae.',
    url: 'https://lovebae.app/blog',
    siteName: 'Lovebae',
    locale: 'en_US',
    type: 'website',
    // OG image is auto-generated from opengraph-image.js
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lovebae Blog | Relationship Tips & Couples Advice',
    description: 'Discover relationship tips, romantic date ideas, and expert guidance for couples.',
    // Twitter image is auto-generated
  },
  alternates: {
    canonical: 'https://lovebae.app/blog',
  },
};

// Blog list component that handles filtering
function BlogList({ query, category }) {
  let posts = getAllPosts();
  
  // Apply search filter
  if (query) {
    posts = searchPosts(query);
  }
  
  // Apply category filter
  if (category && category !== 'All') {
    posts = posts.filter(
      (post) => post.frontmatter.category?.toLowerCase() === category.toLowerCase()
    );
  }
  
  const categories = getAllCategories();
  
  return (
    <>
      {/* Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
          <Suspense fallback={<div className="h-12 w-full max-w-md bg-gray-100 rounded-full animate-pulse" />}>
            <BlogSearch />
          </Suspense>
          
          <Suspense fallback={<div className="h-10 w-64 bg-gray-100 rounded-full animate-pulse" />}>
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>
      </div>
      
      {/* Results Info */}
      {(query || category) && (
        <div className="container mx-auto px-4 pb-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-500 text-sm">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'} found
              {query && <span> for "<strong>{query}</strong>"</span>}
              {category && category !== 'All' && <span> in <strong>{category}</strong></span>}
            </p>
          </div>
        </div>
      )}
      
      {/* Articles Grid */}
      <div className="container mx-auto px-4 pb-16">
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 max-w-2xl mx-auto">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">
              {query 
                ? `We couldn't find any articles matching "${query}". Try a different search term.`
                : 'No articles in this category yet. Check back soon!'}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default async function BlogPage({ searchParams }) {
  // Await searchParams in Next.js 15
  const resolvedParams = await searchParams;
  const query = resolvedParams?.q || '';
  const category = resolvedParams?.category || '';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-[#FFF0F5] to-white pt-32 pb-8">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The Lovebae Blog
              </h1>
              <p className="text-xl text-gray-600">
                Relationship tips, date ideas, and advice to help you and your partner grow closer every day.
              </p>
            </div>
          </div>
        </div>
        
        {/* Blog List with Filters */}
        <BlogList query={query} category={category} />
      </main>
      <Footer />
    </>
  );
}
