'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50">
            <span className="text-xl font-bold text-gray-900">
              Love<span className="text-red-500">bae</span>
              </span>
          </Link>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link 
              href="/waitlist" 
              className="bg-red-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-red-600 transition-colors shadow-sm hover:shadow-md"
            >
              Try for Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center space-y-8">
                <Link 
                  href="/"
                  className="text-2xl font-semibold text-gray-900 hover:text-red-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/blog"
                  className="text-2xl font-semibold text-gray-900 hover:text-red-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  href="/support"
                  className="text-2xl font-semibold text-gray-900 hover:text-red-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Support
                </Link>
                <Link 
                  href="/waitlist"
                  className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Try for Free
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 
