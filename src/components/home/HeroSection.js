'use client';

import React from 'react';
import AppStoreButtons from '@/components/common/AppStoreButtons';
import appStoreConfig from '@/config/appStore.config.json';

const HeroSection = () => {
  const { socialProof } = appStoreConfig;
  
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F5] via-[#FFF5F8] to-white -z-10"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#E7000B]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-[#FFCDD2]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
              Make your relationship {' '}
              <span className="text-[#E7000B]">10x</span> better.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Lovebae helps couples stay connected, share moments, and grow together. Now it's your turn to make your relationship the best it's ever been.
            </p>
            
            {/* App Store Buttons - Now configurable */}
            <AppStoreButtons 
              className="justify-center lg:justify-start mb-8" 
              layout="row"
            />
            
            {/* Social proof - configurable */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
              {socialProof.showRating && (
                <>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 font-medium">{socialProof.rating}</span>
                  </div>
                  {socialProof.showCouplesCount && <span className="text-gray-300">|</span>}
                </>
              )}
              {socialProof.showCouplesCount && (
                <span>{socialProof.couplesCount} couples connected</span>
              )}
            </div>
          </div>
          
          {/* Right side - Phone mockups with accurate Home Screen UI */}
          <div className="lg:w-1/2 relative">
            <div className="flex justify-center lg:justify-end items-center">
              {/* Phone mockups container - both phones move together */}
              <div className="relative">
                {/* Background phone (partner's view) */}
                <div className="absolute -left-32 md:-left-40 top-8 transform -rotate-6 z-0">
                  <div className="w-56 md:w-64 h-[450px] md:h-[520px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                      <div className="p-4 pt-10">
                        {/* Partner's mood card */}
                        <div className="bg-[#F3E8FF] rounded-2xl p-4 mb-3">
                          <p className="text-xs text-gray-500 mb-2">Partner's Mood</p>
                          <div className="flex items-center gap-3">
                            <span className="text-4xl">🥰</span>
                            <div>
                              <p className="font-semibold text-gray-900">Feeling loved</p>
                              <p className="text-xs text-gray-500">Just now</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Quick actions preview */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-[#FCE7F3] rounded-xl p-3 text-center">
                            <span className="text-2xl">💋</span>
                            <p className="text-xs text-gray-600 mt-1">Send Kiss</p>
                          </div>
                          <div className="bg-[#F3E8FF] rounded-xl p-3 text-center">
                            <span className="text-2xl">🤗</span>
                            <p className="text-xs text-gray-600 mt-1">Send Hug</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main phone (front) - Accurate Home Screen */}
                <div className="relative z-10 transform rotate-3">
                <div className="w-64 md:w-72 h-[500px] md:h-[580px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  {/* Phone notch */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full z-20"></div>
                  
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    <div className="p-5 pt-12">
                      {/* Couple Profile Section */}
                      <div className="flex items-center justify-center gap-4 mb-4">
                        {/* My avatar */}
                        <div className="text-center">
                          <div className="w-14 h-14 rounded-full bg-[#FFE4EC] p-1 mb-1">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl">
                              😊
                            </div>
                          </div>
                          <p className="text-xs font-medium text-gray-700">You</p>
                        </div>
                        
                        {/* Heart icon */}
                        <div className="w-10 h-10 rounded-full bg-[#FFF5F8] flex items-center justify-center animate-pulse">
                          <span className="text-lg">💕</span>
                        </div>
                        
                        {/* Partner avatar */}
                        <div className="text-center">
                          <div className="w-14 h-14 rounded-full bg-[#E8F4FF] p-1 mb-1">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl">
                              🥰
                            </div>
                          </div>
                          <p className="text-xs font-medium text-gray-700">Partner</p>
                        </div>
                      </div>
                      
                      {/* Days together badge */}
                      <div className="flex justify-center mb-4">
                        <div className="inline-flex items-center gap-1.5 bg-[#FFF5F8] px-4 py-1.5 rounded-full">
                          <span className="text-[#E7000B]">❤️</span>
                          <span className="text-sm font-semibold text-[#E7000B]">247 days together</span>
                        </div>
                      </div>
                      
                      {/* Daily Check-in Card */}
                      <div className="bg-white rounded-2xl p-4 border border-[#FCE7F3] shadow-sm mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span>💝</span>
                            <span className="text-sm font-semibold text-gray-900">Daily Check-in</span>
                          </div>
                          <span className="text-xs font-semibold text-[#E7000B] bg-[#FCE7F3] px-2 py-0.5 rounded-full">+10 pts</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">How are you feeling today?</p>
                        
                        {/* Mood Grid */}
                        <div className="grid grid-cols-4 gap-2 mb-3">
                          {[
                            { emoji: '😍', label: 'Loved', bg: '#FFF0F5' },
                            { emoji: '😊', label: 'Happy', bg: '#FFFBEB' },
                            { emoji: '😌', label: 'Calm', bg: '#EFF6FF' },
                            { emoji: '🥺', label: 'Miss you', bg: '#F5F3FF' },
                          ].map((mood, i) => (
                            <div 
                              key={i} 
                              className={`rounded-xl py-2 text-center ${i === 0 ? 'ring-2 ring-[#E7000B]' : ''}`}
                              style={{ backgroundColor: mood.bg }}
                            >
                              <span className="text-lg">{mood.emoji}</span>
                              <p className="text-[10px] text-gray-500 mt-0.5">{mood.label}</p>
                            </div>
                          ))}
                        </div>
                        
                        {/* Send Love button */}
                        <button className="w-full bg-[#E7000B] text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                          <span>Send Love</span>
                        </button>
                      </div>
                      
                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white rounded-xl p-2 text-center border border-[#FCE7F3]">
                          <div className="w-8 h-8 mx-auto rounded-full bg-[#FCE7F3] flex items-center justify-center mb-1">
                            <span className="text-sm">🔥</span>
                          </div>
                          <p className="text-base font-bold text-gray-900">12</p>
                          <p className="text-[9px] text-gray-500">Day Streak</p>
                        </div>
                        <div className="bg-white rounded-xl p-2 text-center border border-[#F3E8FF]">
                          <div className="w-8 h-8 mx-auto rounded-full bg-[#F3E8FF] flex items-center justify-center mb-1">
                            <span className="text-sm">💌</span>
                          </div>
                          <p className="text-base font-bold text-gray-900">24</p>
                          <p className="text-[9px] text-gray-500">Love Notes</p>
                        </div>
                        <div className="bg-white rounded-xl p-2 text-center border border-[#FEF3C7]">
                          <div className="w-8 h-8 mx-auto rounded-full bg-[#FEF3C7] flex items-center justify-center mb-1">
                            <span className="text-sm">❤️</span>
                          </div>
                          <p className="text-base font-bold text-gray-900">156</p>
                          <p className="text-[9px] text-gray-500">Hearts</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End of phone mockups container */}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
