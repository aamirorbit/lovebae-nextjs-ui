'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const benefits = [
  {
    icon: '💰',
    title: 'Earn Commission',
    description: 'Get 10% of every creator you refer - for as long as they earn with us.',
  },
  {
    icon: '🤝',
    title: 'Flexible Collaboration',
    description: 'Work on your terms. Stories, posts, reels - you choose what works for your audience.',
  },
  {
    icon: '💕',
    title: 'Perfect Fit',
    description: 'If your audience is couples looking to strengthen their relationships, Lovebae is made for them.',
  },
  {
    icon: '📈',
    title: 'Grow Together',
    description: 'As we grow, you grow. Early partners get priority access to new opportunities.',
  },
];

const howItWorks = [
  {
    step: '1',
    title: 'Apply',
    description: 'Fill out a quick application with your social media details.',
  },
  {
    step: '2',
    title: 'Get Approved',
    description: 'Our team reviews your application and gets in touch to discuss collaboration.',
  },
  {
    step: '3',
    title: 'Create & Share',
    description: 'Create authentic content about Lovebae for your audience.',
  },
  {
    step: '4',
    title: 'Earn',
    description: 'Get compensated for your content and earn referral commissions forever.',
  },
];

const faqs = [
  {
    question: 'Who can apply?',
    answer: 'We\'re looking for content creators whose audience includes couples - whether that\'s relationship advice, couple vlogs, lifestyle content, or similar niches. All follower counts are welcome!',
  },
  {
    question: 'How does the referral program work?',
    answer: 'When you\'re approved, you\'ll get a unique referral code. When other creators join using your code, you earn 10% of their earnings - forever. It\'s passive income that grows as our creator community grows.',
  },
  {
    question: 'How much can I earn?',
    answer: 'Compensation varies based on your content type, reach, and engagement. We\'ll discuss the details with you personally after reviewing your application.',
  },
  {
    question: 'What kind of content should I create?',
    answer: 'Authentic content works best! Stories, posts, reels - whatever resonates with your audience. We\'ll provide guidelines and creative freedom.',
  },
  {
    question: 'How long does approval take?',
    answer: 'We review applications within 3-5 business days. You\'ll receive an email with next steps once your application is reviewed.',
  },
];

// Inline code lookup component
function CodeLookupSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setResult(null);
    
    try {
      const response = await fetch(`/api/creators?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (response.ok && data.success) {
        setResult(data.creator);
      } else {
        setError('No application found with this email. Have you applied yet?');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (result?.referralCode) {
      await navigator.clipboard.writeText(result.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'approved':
        return { color: 'text-green-600', bg: 'bg-green-50', label: 'Approved - Your code is active!' };
      case 'pending':
        return { color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Pending Review - Code will be active after approval' };
      case 'rejected':
        return { color: 'text-red-600', bg: 'bg-red-50', label: 'Not Approved' };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-50', label: status };
    }
  };

  return (
    <section id="get-code" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Already Applied?
            </h2>
            <p className="text-gray-600">
              Enter your email to retrieve your referral code
            </p>
          </div>
          
          {!result ? (
            <form onSubmit={handleLookup} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E7000B] focus:border-transparent"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-[#E7000B] text-white rounded-xl font-semibold hover:bg-[#C50009] transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {isLoading ? 'Looking...' : 'Get Code'}
              </button>
            </form>
          ) : (
            <div className="bg-gradient-to-br from-[#FFF0F5] to-white rounded-2xl p-6 border border-[#FCE7F3]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Hi, {result.name?.split(' ')[0]}!</span>
                <button 
                  onClick={() => { setResult(null); setEmail(''); }}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  Look up another
                </button>
              </div>
              
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${getStatusInfo(result.status).bg} ${getStatusInfo(result.status).color}`}>
                {getStatusInfo(result.status).label}
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-sm text-gray-500 mb-2">Your Referral Code</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-[#E7000B]">{result.referralCode}</span>
                  <button
                    onClick={handleCopy}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      copied 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              
              {result.status === 'approved' && (
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Share this code with other creators to earn 10% of their earnings!
                </p>
              )}
            </div>
          )}
          
          {error && (
            <p className="text-[#E7000B] text-sm mt-3 text-center">{error}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default function CreatorsPage() {
  return (
    <main className="bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F5] via-[#FFF5F8] to-white -z-10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#E7000B]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-[#FFCDD2]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <span className="w-8 h-0.5 bg-[#E7000B] rounded-full mr-2"></span>
              <span className="text-[#E7000B] font-medium text-sm uppercase tracking-wide">Creator Program</span>
              <span className="w-8 h-0.5 bg-[#E7000B] rounded-full ml-2"></span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Partner with{' '}
              <span className="text-[#E7000B]">Lovebae</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              Do you create content for couples?{' '}
              <span className="text-gray-900 font-medium">Let's grow together.</span>
            </p>
            
            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
              Join our creator program and help couples build stronger relationships while earning through content collaborations and referrals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/creators/apply"
                className="inline-flex items-center justify-center bg-[#E7000B] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#C50009] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Apply Now
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border border-gray-200 hover:border-[#E7000B]/30 hover:text-[#E7000B] transition-all"
              >
                Learn More
              </a>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              Already applied?{' '}
              <a href="#get-code" className="text-[#E7000B] hover:underline font-medium">
                Get your referral code
              </a>
            </p>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe in building genuine partnerships that benefit everyone - you, your audience, and us.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-[#FFF5F8] rounded-2xl p-6 border border-[#FCE7F3] hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#FCE7F3] rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Referral Highlight */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-red-500 to-pink-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="text-5xl mb-6">🎁</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Earn 10% Forever
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              When you join, you get a unique referral code. Every creator who joins using your code earns you 10% of their earnings - for as long as they're with us.
            </p>
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-lg">
              <span className="mr-2">Your Code:</span>
              <span className="font-mono font-bold">LB-XXXXXX</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting started is simple. Here's what to expect.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {howItWorks.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#E7000B] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Target Audience */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#FFF0F5] to-white rounded-3xl p-8 md:p-12 border border-[#FCE7F3]">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-6xl">💑</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Perfect For Couples-Focused Creators
                </h3>
                <p className="text-gray-600 text-lg">
                  If your Instagram or TikTok audience includes couples looking to strengthen their relationships, 
                  Lovebae is the perfect fit. Whether you create relationship advice, couple challenges, 
                  date ideas, or lifestyle content - your audience will love what we offer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Get Your Code Section */}
      <CodeLookupSection />
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-red-200 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-500 via-red-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Partner With Lovebae?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Join our creator community today and start earning while helping couples build stronger relationships.
            </p>
            <Link
              href="/creators/apply"
              className="inline-flex items-center justify-center bg-white text-[#E7000B] px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Apply Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
