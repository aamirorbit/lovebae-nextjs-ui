'use client';

import React, { useState } from 'react';

export function ReferralCodeCard({ code, className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/creators/apply?ref=${code}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Lovebae Creator Program',
          text: `Use my referral code ${code} to join the Lovebae Creator Program!`,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className={`bg-gradient-to-br from-[#FFF0F5] to-white rounded-2xl p-6 border border-[#FCE7F3] ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎁</span>
          <h3 className="font-semibold text-gray-900">Your Referral Code</h3>
        </div>
        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
          Earn 10%
        </span>
      </div>
      
      <div className="bg-white rounded-xl p-4 border border-gray-100 mb-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-2xl font-bold text-[#E7000B]">{code}</span>
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-all ${
              copied 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {copied ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">
        Share this code with other creators. When they join and earn, you get 10% of their earnings - forever!
      </p>
      
      <div className="flex gap-2">
        <button
          onClick={handleShare}
          className="flex-1 bg-red-500 text-white py-2.5 px-4 rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="flex-1 bg-white text-gray-700 py-2.5 px-4 rounded-xl font-medium border border-gray-200 hover:border-red-300 hover:text-[#E7000B] transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Copy Link
        </button>
      </div>
    </div>
  );
}
