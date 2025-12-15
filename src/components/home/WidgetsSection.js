'use client';

import React from 'react';

const WidgetsSection = () => {
  // Actual gradient presets from the app
  const gradients = {
    sunset: 'linear-gradient(135deg, #667EEA 0%, #F093FB 100%)',
    ocean: 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)',
    peach: 'linear-gradient(135deg, #FFB88C 0%, #DE6262 100%)',
    aurora: 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)',
    lovebae: 'linear-gradient(135deg, #FF6B6B 0%, #FFCDD2 100%)',
    night: 'linear-gradient(135deg, #0F2027 0%, #2C5364 100%)',
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Use widgets to track your relationship.
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Widgets are an essential part of Lovebae. They help you track upcoming events, days in love, and you can even display your partner's mood right on your home screen.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-green-500">✓</span>
                <span className="text-sm text-gray-700">Lock Screen Widgets</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-green-500">✓</span>
                <span className="text-sm text-gray-700">Home Screen Widgets</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-green-500">✓</span>
                <span className="text-sm text-gray-700">Custom Gradients</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Widget showcase with actual gradients */}
          <div className="lg:w-1/2 relative flex flex-col items-center lg:items-end">
            <div className="grid grid-cols-2 gap-4 max-w-md">
              
              {/* Mood Widget - Small (based on iOS WidgetViews.swift) */}
              <div 
                className="rounded-3xl p-5 shadow-xl aspect-square flex flex-col items-center justify-center text-white"
                style={{ background: gradients.lovebae }}
              >
                <span className="text-5xl mb-2 drop-shadow-lg">😊</span>
                <p className="text-sm font-medium opacity-90">Happy</p>
                <p className="text-xs opacity-70">Partner</p>
              </div>
              
              {/* Days Counter Widget */}
              <div 
                className="rounded-3xl p-5 shadow-xl aspect-square flex flex-col items-center justify-center text-white"
                style={{ background: gradients.sunset }}
              >
                <span className="text-4xl mb-1 drop-shadow-lg">💕</span>
                <p className="text-3xl font-bold">247</p>
                <p className="text-xs opacity-80">days together</p>
              </div>
              
              {/* Love Letter Widget - Medium (spans 2 columns) */}
              <div 
                className="col-span-2 rounded-3xl p-5 shadow-xl text-white"
                style={{ background: gradients.peach }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❤️</span>
                  <div className="flex-1">
                    <p className="text-base font-medium leading-relaxed">
                      "Just wanted to say you make every day better. Love you! 💕"
                    </p>
                    <p className="text-sm opacity-70 mt-2">— Partner</p>
                  </div>
                </div>
              </div>
              
              {/* Upcoming Event Widget */}
              <div 
                className="rounded-3xl p-4 shadow-xl text-white"
                style={{ background: gradients.ocean }}
              >
                <p className="text-xs opacity-70 mb-1">UPCOMING</p>
                <p className="text-sm font-semibold mb-1">Anniversary</p>
                <p className="text-2xl font-bold">23</p>
                <p className="text-xs opacity-70">days left</p>
              </div>
              
              {/* Mood with Note Widget */}
              <div 
                className="rounded-3xl p-4 shadow-xl text-white"
                style={{ background: gradients.aurora }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🥰</span>
                  <span className="text-sm font-medium text-gray-700">Feeling loved</span>
                </div>
                <p className="text-xs text-gray-600">"Missing you today"</p>
              </div>
              
            </div>
            
            {/* Gradient selector preview */}
            <div className="mt-6 flex justify-center lg:justify-end gap-2 w-full max-w-md">
              {Object.entries(gradients).slice(0, 5).map(([name, gradient]) => (
                <div 
                  key={name}
                  className="w-8 h-8 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform"
                  style={{ background: gradient }}
                  title={name.charAt(0).toUpperCase() + name.slice(1)}
                />
              ))}
            </div>
            <p className="text-center lg:text-right text-sm text-gray-500 mt-2 w-full max-w-md">Choose from beautiful gradient themes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WidgetsSection;
