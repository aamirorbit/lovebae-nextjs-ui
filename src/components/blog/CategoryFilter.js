'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';

  const handleCategoryClick = (category) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    
    // Remove page param when changing category
    params.delete('page');
    
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  const allCategories = ['All', ...categories];

  return (
    <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
      <div className="flex gap-2 justify-center min-w-max">
        {allCategories.map((category) => {
          const isActive = currentCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#FF6B6B] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
