'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AppShowcase = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };

  // Gradient presets from WallpaperCanvasScreen.tsx
  const gradientPresets = [
    { name: 'Sunset', colors: ['#667EEA', '#F093FB'] },
    { name: 'Ocean', colors: ['#4FACFE', '#00F2FE'] },
    { name: 'Peach', colors: ['#FFB88C', '#DE6262'] },
    { name: 'Aurora', colors: ['#A8EDEA', '#FED6E3'] },
    { name: 'Lovebae', colors: ['#FF6B6B', '#FFCDD2'] },
    { name: 'Night', colors: ['#0F2027', '#2C5364'] },
  ];

  const [selectedGradient, setSelectedGradient] = useState(gradientPresets[0]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#FFF0F5] via-white to-[#FFF5F8] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Draw together on <br /><span className="text-[#FF6B6B]">shared canvas</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto lg:mx-0">
              Create beautiful art with your partner in real-time. Draw, doodle, and express your love on a canvas that syncs instantly. Save it as your lock screen wallpaper!
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FCE7F3] flex items-center justify-center flex-shrink-0">
                  <span>🎨</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Real-time sync</p>
                  <p className="text-sm text-gray-600">See your partner draw as they do it</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] flex items-center justify-center flex-shrink-0">
                  <span>📱</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Set as wallpaper</p>
                  <p className="text-sm text-gray-600">Save your creation as lock screen</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
                  <span>🌈</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Beautiful gradients</p>
                  <p className="text-sm text-gray-600">Choose from stunning background themes</p>
                </div>
              </div>
            </div>
            
            <Link 
              href="/waitlist"
              className="inline-flex items-center bg-[#FF6B6B] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#E55555] transition-colors shadow-lg shadow-[#FF6B6B]/30"
            >
              Get Started
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          {/* Right side - Whiteboard Canvas with iOS lock screen style */}
          <div className="lg:w-1/2 relative">
            <div className="relative flex justify-center lg:justify-end">
              {/* Phone mockup with Canvas */}
              <div className="relative z-10">
                <div className="w-72 md:w-80 h-[580px] md:h-[640px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full z-20"></div>
                  
                  <div 
                    className="w-full h-full rounded-[2.5rem] overflow-hidden relative"
                    style={{ 
                      background: `linear-gradient(135deg, ${selectedGradient.colors[0]} 0%, ${selectedGradient.colors[1]} 100%)` 
                    }}
                  >
                    {/* iOS Lock Screen style Date/Time */}
                    <div className="absolute top-16 left-0 right-0 text-center pointer-events-none">
                      <p className="text-lg font-light text-white/80" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                        {formatDate(currentTime)}
                      </p>
                      <p 
                        className="text-7xl font-extralight text-white mt-1" 
                        style={{ 
                          textShadow: '0 2px 6px rgba(0,0,0,0.3)',
                          letterSpacing: '-2px'
                        }}
                      >
                        {formatTime(currentTime)}
                      </p>
                    </div>
                    
                    {/* Drawn content (simulated) */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 600">
                      {/* Heart shape drawn by user */}
                      <path 
                        d="M150 350 C120 320, 100 280, 130 260 C160 240, 180 260, 150 290 C120 260, 140 240, 170 260 C200 280, 180 320, 150 350"
                        fill="none" 
                        stroke="white" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                        opacity="0.9"
                      />
                      {/* "I ❤ U" text scribble */}
                      <text x="100" y="420" fill="white" fontSize="24" fontFamily="cursive" opacity="0.85">I ❤ U</text>
                      {/* Small stars */}
                      <circle cx="80" cy="250" r="3" fill="white" opacity="0.7" />
                      <circle cx="220" cy="280" r="2" fill="white" opacity="0.6" />
                      <circle cx="240" cy="380" r="3" fill="white" opacity="0.8" />
                    </svg>
                    
                    {/* Partner cursor indicator */}
                    <div className="absolute top-[320px] left-[180px] animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-white/60 border-2 border-white shadow-lg"></div>
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-white font-medium whitespace-nowrap" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                        Partner
                      </span>
                    </div>
                    
                    
                    {/* Bottom toolbar */}
                    <div className="absolute bottom-8 left-4 right-4">
                      {/* Color palette */}
                      <div className="flex justify-center gap-2 mb-3 bg-black/60 rounded-full py-2.5 px-4">
                        {['#FFFFFF', '#1A1A1A', '#FF6B6B', '#FF69B4', '#FFA500', '#FFD700', '#4ADE80', '#60A5FA', '#A78BFA'].map((color, i) => (
                          <div 
                            key={i}
                            className={`w-5 h-5 rounded-full ${color === '#FFFFFF' ? 'ring-2 ring-white ring-offset-1 ring-offset-transparent' : ''}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      
                      {/* Stroke sizes + actions */}
                      <div className="flex justify-center items-center gap-3 bg-black/60 rounded-full py-2.5 px-6">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-white"></div>
                          </div>
                        </div>
                        
                        <div className="w-px h-6 bg-white/25"></div>
                        
                        <div className="flex gap-2">
                          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                          </div>
                          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gradient selector */}
            <div className="mt-6 flex justify-center lg:justify-end gap-3 flex-wrap">
              {gradientPresets.map((gradient) => (
                <button 
                  key={gradient.name}
                  onClick={() => setSelectedGradient(gradient)}
                  className={`group flex flex-col items-center gap-1 ${selectedGradient.name === gradient.name ? 'scale-110' : ''} transition-transform`}
                >
                  <div 
                    className={`w-10 h-10 rounded-full shadow-md ${selectedGradient.name === gradient.name ? 'ring-2 ring-[#FF6B6B] ring-offset-2' : ''}`}
                    style={{ background: `linear-gradient(135deg, ${gradient.colors[0]} 0%, ${gradient.colors[1]} 100%)` }}
                  />
                  <span className="text-xs text-gray-500 group-hover:text-gray-700">{gradient.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
