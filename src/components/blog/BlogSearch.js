'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';

export default function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  // Update local state when URL changes
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const updateSearch = useCallback((value) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    
    // Remove page param when searching
    params.delete('page');
    
    router.push(`/blog?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounce the URL update
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      updateSearch(value);
    }, 300);
  };

  const handleClear = () => {
    setQuery('');
    updateSearch('');
  };

  return (
    <div className="relative max-w-md w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={handleChange}
          className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-200 focus:border-[#E7000B] focus:ring-2 focus:ring-[#E7000B]/20 outline-none transition-all bg-white"
        />
        
        {/* Search icon */}
        <svg 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        
        {/* Clear button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
