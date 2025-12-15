'use client';

import React from 'react';

export default function BlogContent({ children }) {
  return (
    <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#FF6B6B] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-600 prose-ol:text-gray-600 prose-blockquote:border-l-[#FF6B6B] prose-blockquote:bg-red-50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg">
      {children}
    </article>
  );
}
