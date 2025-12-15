'use client';

import React from 'react';
import Link from 'next/link';

const BlogSection = () => {
  const articles = [
    {
      title: 'The Only Guide Couples Need for Weekend Getaways',
      description: 'Looking for inspiration for winter weekend getaways with your partner? This guide brings you Europe\'s most charming cold-weather city breaks.',
      category: 'Travel',
      emoji: '✈️',
      color: 'from-blue-100 to-cyan-100'
    },
    {
      title: 'The Best Long Distance Relationship Gifts to Make Distance Feel Smaller',
      description: 'Distance can make love feel challenging, but the right gestures bring you closer than ever. Discover the best long distance relationship gifts.',
      category: 'Gifts',
      emoji: '🎁',
      color: 'from-pink-100 to-red-100'
    },
    {
      title: 'Fun Questions for Couples: From Never Have I Ever to Trivia Questions',
      description: 'Kick off the holiday season with these fun Christmas questions for couples — fun, flirty, and perfect for cozy nights together.',
      category: 'Questions',
      emoji: '💬',
      color: 'from-purple-100 to-pink-100'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover our articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our hand-crafted blog posts that offer engaging questions for couples, ideas, and tools to strengthen your relationship with your partner with every read.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((article, index) => (
            <Link 
              key={index}
              href="/blog"
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Article image placeholder */}
              <div className={`h-48 bg-gradient-to-br ${article.color} flex items-center justify-center`}>
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                  {article.emoji}
                </span>
              </div>
              
              <div className="p-6">
                <span className="inline-block bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {article.category}
                </span>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-500 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-3">
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            href="/blog"
            className="inline-flex items-center text-red-500 font-semibold hover:text-red-600 transition-colors"
          >
            View all articles
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
