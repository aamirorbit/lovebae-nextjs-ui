'use client';

import React from 'react';

const QuestionsSection = () => {
  // Based on check-in feature from the app (CheckInListScreen, question packs)
  const checkInTypes = [
    {
      title: 'Daily Check-ins',
      description: 'Quick questions to connect every day. Share your mood and what\'s on your mind.',
      count: 'Daily',
      icon: '☀️',
      color: 'bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]',
      borderColor: 'border-amber-200',
      points: '+10 pts'
    },
    {
      title: 'Weekly Deep Talks',
      description: 'Meaningful questions for deeper conversations. Reflect on your week together.',
      count: 'Weekly',
      icon: '💭',
      color: 'bg-gradient-to-br from-[#F3E8FF] to-[#E9D5FF]',
      borderColor: 'border-purple-200',
      points: '+25 pts'
    },
    {
      title: 'Monthly Reflections',
      description: 'Look back on your relationship journey. Celebrate growth and set new goals.',
      count: 'Monthly',
      icon: '🌙',
      color: 'bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]',
      borderColor: 'border-blue-200',
      points: '+50 pts'
    }
  ];

  const sampleQuestions = [
    "What made you fall in love with your partner?",
    "What's one thing you appreciate about them today?",
    "What's your favorite memory together this week?",
    "If you could go anywhere together, where would it be?",
    "What's something new you learned about each other?",
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meaningful check-ins that strengthen your bond
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Daily, weekly, and monthly questions designed to spark real conversations. Earn points, build streaks, and grow closer every day.
          </p>
        </div>
        
        {/* Check-in Types */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {checkInTypes.map((type, index) => (
            <div 
              key={index}
              className={`${type.color} border ${type.borderColor} rounded-3xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{type.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {type.count}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#E7000B] bg-white px-2 py-1 rounded-full shadow-sm">
                  {type.points}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {type.title}
              </h3>
              
              <p className="text-sm text-gray-600">
                {type.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Sample Questions Preview */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sample Questions</h3>
            <p className="text-gray-500 text-sm">Thoughtfully crafted to spark meaningful conversations</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#FFF0F5] to-[#FFF5F8] rounded-3xl p-6 md:p-8">
            <div className="space-y-4">
              {sampleQuestions.map((question, i) => (
                <div 
                  key={i}
                  className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FCE7F3] flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">💬</span>
                  </div>
                  <p className="text-gray-700 font-medium">{question}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Hundreds more questions across different categories
              </p>
            </div>
          </div>
        </div>
        
        {/* Feature row - Quick Actions from the app */}
        <div className="mt-16 grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: '💋', title: 'Send Kiss', desc: '10 hearts', bg: '#FCE7F3' },
            { icon: '🤗', title: 'Send Hug', desc: '10 hearts', bg: '#F3E8FF' },
            { icon: '🎨', title: 'Draw Together', desc: 'Real-time', bg: '#FEF3C7' },
            { icon: '💌', title: 'Love Letter', desc: 'Templates', bg: '#DCFCE7' },
          ].map((action, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-4 text-center hover:shadow-md transition-shadow border border-gray-100"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto mb-2"
                style={{ backgroundColor: action.bg }}
              >
                {action.icon}
              </div>
              <p className="font-semibold text-gray-900 text-sm">{action.title}</p>
              <p className="text-xs text-gray-500">{action.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuestionsSection;
