'use client';

import React from 'react';
import Link from 'next/link';
import appStoreConfig from '@/config/appStore.config.json';

const AppStoreButtons = ({ 
  variant = 'default', // 'default' | 'light' | 'dark'
  size = 'normal', // 'normal' | 'small' | 'large'
  className = '',
  layout = 'row' // 'row' | 'column'
}) => {
  const { ios, android, waitlistUrl, showWaitlistAsFallback } = appStoreConfig;
  
  // Size classes
  const sizeClasses = {
    small: 'px-4 py-2',
    normal: 'px-6 py-3',
    large: 'px-8 py-4'
  };
  
  const iconSizes = {
    small: 'w-6 h-6',
    normal: 'w-8 h-8',
    large: 'w-10 h-10'
  };
  
  const textSizes = {
    small: { top: 'text-[10px]', bottom: 'text-sm' },
    normal: { top: 'text-xs', bottom: 'text-lg' },
    large: { top: 'text-sm', bottom: 'text-xl' }
  };
  
  // Variant classes
  const variantClasses = {
    default: 'bg-black text-white hover:bg-gray-800',
    light: 'bg-white text-gray-900 hover:bg-gray-100 border border-gray-200',
    dark: 'bg-gray-900 text-white hover:bg-black'
  };
  
  const layoutClasses = {
    row: 'flex-row',
    column: 'flex-col'
  };

  // Check if any store is enabled and live
  const hasLiveStore = (ios.enabled && ios.isLive) || (android.enabled && android.isLive);
  
  // If no stores enabled at all, show waitlist
  if (!ios.enabled && !android.enabled && showWaitlistAsFallback) {
    return (
      <div className={`flex ${layoutClasses[layout]} gap-4 ${className}`}>
        <Link 
          href={waitlistUrl}
          className={`inline-flex items-center justify-center ${sizeClasses[size]} ${variantClasses[variant]} rounded-xl transition-colors`}
        >
          <span className="font-semibold">Join Waitlist</span>
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex ${layoutClasses[layout]} gap-4 ${className}`}>
      {/* iOS App Store Button */}
      {ios.enabled && (
        ios.isLive ? (
          <a 
            href={ios.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center ${sizeClasses[size]} ${variantClasses[variant]} rounded-xl transition-colors`}
          >
            <svg className={`${iconSizes[size]} mr-3`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left">
              <div className={textSizes[size].top}>Download on the</div>
              <div className={`${textSizes[size].bottom} font-semibold -mt-1`}>{ios.storeName}</div>
            </div>
          </a>
        ) : (
          <div className="relative">
            <div 
              className={`inline-flex items-center justify-center ${sizeClasses[size]} bg-gray-100 text-gray-600 rounded-xl cursor-not-allowed border border-gray-200`}
            >
              <svg className={`${iconSizes[size]} mr-3 opacity-50`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <div className={`${textSizes[size].top} text-gray-400`}>{ios.comingSoonText}</div>
                <div className={`${textSizes[size].bottom} font-semibold -mt-1 text-gray-600`}>{ios.storeName}</div>
              </div>
            </div>
            {/* Coming soon badge - positioned outside the button */}
            <div className="absolute -top-2 -right-2 bg-[#FF6B6B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md z-10">
              SOON
            </div>
          </div>
        )
      )}
      
      {/* Android Play Store Button */}
      {android.enabled && (
        android.isLive ? (
          <a 
            href={android.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center ${sizeClasses[size]} ${variantClasses[variant]} rounded-xl transition-colors`}
          >
            <svg className={`${iconSizes[size]} mr-3`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            <div className="text-left">
              <div className={textSizes[size].top}>GET IT ON</div>
              <div className={`${textSizes[size].bottom} font-semibold -mt-1`}>{android.storeName}</div>
            </div>
          </a>
        ) : (
          <div className="relative">
            <div 
              className={`inline-flex items-center justify-center ${sizeClasses[size]} bg-gray-100 text-gray-600 rounded-xl cursor-not-allowed border border-gray-200`}
            >
              <svg className={`${iconSizes[size]} mr-3 opacity-50`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div className="text-left">
                <div className={`${textSizes[size].top} text-gray-400`}>{android.comingSoonText}</div>
                <div className={`${textSizes[size].bottom} font-semibold -mt-1 text-gray-600`}>{android.storeName}</div>
              </div>
            </div>
            {/* Coming soon badge - positioned outside the button */}
            <div className="absolute -top-2 -right-2 bg-[#FF6B6B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md z-10">
              SOON
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AppStoreButtons;
