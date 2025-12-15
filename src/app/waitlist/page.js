'use client';

import React from 'react';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import Link from 'next/link';

export default function WaitlistPage() {
  return (
    <div className="py-16 bg-gradient-to-br from-pink-50 via-white to-red-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12">
            <div className="flex justify-start mb-6">
              <Link href="/" className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Home
              </Link>
            </div>
            
            <div className="text-center mb-10">
              <div className="text-5xl mb-4">💕</div>
              
              <div className="inline-flex items-center justify-center mb-4">
                <span className="w-8 h-0.5 bg-red-600 rounded-full mr-2"></span>
                <span className="text-red-600 font-medium text-sm">GET EARLY ACCESS</span>
                <span className="w-8 h-0.5 bg-red-600 rounded-full ml-2"></span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                Be the First to Experience Lovebae
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Join the waitlist to get early access when we launch. We'll notify you and your partner can join too!
              </p>
            </div>

            <WaitlistForm />

            <div className="mt-10 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free to start
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No spam, ever
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Early access perks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
