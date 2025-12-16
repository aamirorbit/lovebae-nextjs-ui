'use client';

import React from 'react';
import Link from 'next/link';

// Category to emoji/color mapping
const categoryConfig = {
  'Travel': { emoji: '✈️', color: 'from-blue-100 to-cyan-100' },
  'Gifts': { emoji: '🎁', color: 'from-pink-100 to-red-100' },
  'Questions': { emoji: '💬', color: 'from-purple-100 to-pink-100' },
  'Date Ideas': { emoji: '🏠', color: 'from-amber-100 to-orange-100' },
  'Relationship Tips': { emoji: '✨', color: 'from-rose-100 to-pink-100' },
  'Communication': { emoji: '💭', color: 'from-green-100 to-emerald-100' },
};

const defaultConfig = { emoji: '❤️', color: 'from-red-100 to-pink-100' };

export default function BlogCard({ post }) {
  const { slug, frontmatter, readingTime } = post;
  const { title, description, category, date, featured } = frontmatter;
  
  const config = categoryConfig[category] || defaultConfig;
  
  const formattedDate = date 
    ? new Date(date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    : '';

  return (
    <Link 
      href={`/blog/${slug}`}
      className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100 block"
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#E7000B] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            Featured
          </span>
        </div>
      )}
      
      {/* Article image placeholder */}
      <div className={`h-48 bg-gradient-to-br ${config.color} flex items-center justify-center`}>
        <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
          {config.emoji}
        </span>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-red-50 text-[#E7000B] text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
          <span className="text-xs text-gray-400">{readingTime}</span>
        </div>
        
        <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#E7000B] transition-colors line-clamp-2">
          {title}
        </h2>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{formattedDate}</span>
          <span className="text-[#E7000B] font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
            Read more
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
