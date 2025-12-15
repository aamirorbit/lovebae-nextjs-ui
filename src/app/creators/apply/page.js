'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CreatorApplicationForm } from '@/components/creators/CreatorApplicationForm';

function CreatorApplyContent() {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref') || '';

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-pink-50 via-white to-red-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12">
            <div className="flex justify-start mb-6">
              <Link href="/creators" className="inline-flex items-center text-red-500 hover:text-red-600 transition-colors">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Creator Program
              </Link>
            </div>
            
            <div className="text-center mb-10">
              <div className="text-5xl mb-4">🤝</div>
              
              <div className="inline-flex items-center justify-center mb-4">
                <span className="w-8 h-0.5 bg-red-500 rounded-full mr-2"></span>
                <span className="text-red-500 font-medium text-sm uppercase tracking-wide">Creator Application</span>
                <span className="w-8 h-0.5 bg-red-500 rounded-full ml-2"></span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Join the Lovebae Creator Program
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Fill out the form below and we'll review your application within 3-5 business days.
              </p>
              
              <p className="text-sm text-gray-500 mt-4">
                Already applied?{' '}
                <Link href="/creators#get-code" className="text-red-500 hover:underline font-medium">
                  Get your referral code
                </Link>
              </p>
            </div>

            <CreatorApplicationForm referralCode={referralCode} />

            <div className="mt-10 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Quick review process
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  10% referral earnings
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Flexible collaboration
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreatorApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-16 bg-gradient-to-br from-pink-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <CreatorApplyContent />
    </Suspense>
  );
}
