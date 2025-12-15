'use client';

import React from 'react';

const FeatureHighlights = () => {
  // Features based on actual app functionality from HomeScreen.tsx and features.config.json
  const features = [
    {
      icon: '💝',
      title: 'Mood Sharing',
      description: 'Share how you\'re feeling with a tap. Choose from Loved, Happy, Calm, or Miss You — your partner sees it instantly.',
      color: 'bg-[#FFF0F5]', // cardPink from theme
      iconBg: 'bg-[#FCE7F3]'
    },
    {
      icon: '❤️',
      title: 'Home Screen Widgets',
      description: 'Beautiful widgets with custom gradients. See your partner\'s mood, days together, and love notes right on your lock screen.',
      color: 'bg-[#FFECF3]', // Similar to primary light
      iconBg: 'bg-[#FFCDD2]'
    },
    {
      icon: '💌',
      title: 'Love Letters',
      description: 'Write beautiful love letters with stunning templates. Express what words alone can\'t say, and keep them forever.',
      color: 'bg-[#F5F3FF]', // cardLavender from theme
      iconBg: 'bg-[#E9D5FF]'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${feature.color} rounded-3xl p-8 text-center transition-all hover:-translate-y-1 hover:shadow-lg duration-300`}
            >
              <div className={`${feature.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-sm`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Additional feature pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {[
            { emoji: '🐾', text: 'Virtual Pet' },
            { emoji: '🎨', text: 'Draw Together' },
            { emoji: '💋', text: 'Send Kisses' },
            { emoji: '🤗', text: 'Send Hugs' },
            { emoji: '🔥', text: 'Day Streaks' },
            { emoji: '📝', text: 'Check-ins' },
          ].map((item, i) => (
            <div 
              key={i}
              className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <span>{item.emoji}</span>
              <span className="text-sm font-medium text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
