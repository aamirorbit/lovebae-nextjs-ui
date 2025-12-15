'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ReferralCodeCard } from '@/components/creators/ReferralCodeCard';

export default function CreatorDashboardPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [creator, setCreator] = useState(null);
  const [referralStats, setReferralStats] = useState(null);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user previously logged in
  useEffect(() => {
    const savedEmail = localStorage.getItem('creatorEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      fetchCreatorData(savedEmail);
    }
  }, []);

  const fetchCreatorData = async (creatorEmail) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/creators?email=${encodeURIComponent(creatorEmail)}`);
      const data = await response.json();
      
      if (response.ok && data.success) {
        setCreator(data.creator);
        setReferralStats(data.referralStats);
        setIsLoggedIn(true);
        localStorage.setItem('creatorEmail', creatorEmail);
      } else {
        setError(data.message || 'Creator not found');
        localStorage.removeItem('creatorEmail');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    await fetchCreatorData(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('creatorEmail');
    setCreator(null);
    setReferralStats(null);
    setIsLoggedIn(false);
    setEmail('');
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    const labels = {
      pending: 'Pending Review',
      approved: 'Approved',
      rejected: 'Not Approved',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  // Login form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-16 bg-gradient-to-br from-pink-50 via-white to-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8">
              <div className="flex justify-start mb-6">
                <Link href="/creators" className="inline-flex items-center text-red-500 hover:text-red-600 transition-colors">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back
                </Link>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">🔗</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Get Your Referral Code</h1>
                <p className="text-gray-600">Enter the email you used to apply and we'll show your code</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Looking up...' : 'Get My Referral Code'}
                </button>
              </form>
              
              <p className="text-center text-sm text-gray-500 mt-6">
                Haven't applied yet?{' '}
                <Link href="/creators/apply" className="text-red-500 hover:underline">
                  Apply to join the creator program
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-pink-50 via-white to-red-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {creator?.name?.split(' ')[0]}!</h1>
              <p className="text-gray-600">Manage your creator account</p>
            </div>
            <div className="flex items-center gap-4">
              {getStatusBadge(creator?.status)}
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Status Alert for Pending */}
          {creator?.status === 'pending' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏳</span>
                <div>
                  <h3 className="font-semibold text-yellow-800">Application Under Review</h3>
                  <p className="text-yellow-700 text-sm">
                    We're reviewing your application. You'll receive an email once it's approved. 
                    This usually takes 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Status Alert for Rejected */}
          {creator?.status === 'rejected' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">😔</span>
                <div>
                  <h3 className="font-semibold text-red-800">Application Not Approved</h3>
                  <p className="text-red-700 text-sm">
                    Unfortunately, your application wasn't approved at this time. 
                    Feel free to reach out to us if you have questions.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FCE7F3] rounded-xl flex items-center justify-center">
                  <span className="text-xl">💰</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">${(creator?.earnings || 0).toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center">
                  <span className="text-xl">🎁</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Referral Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">${(creator?.referralEarnings || 0).toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#E3F2FD] rounded-xl flex items-center justify-center">
                  <span className="text-xl">👥</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Creators Referred</p>
                  <p className="text-2xl font-bold text-gray-900">{creator?.referralCount || 0}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FFF3E0] rounded-xl flex items-center justify-center">
                  <span className="text-xl">📅</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Date(creator?.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Referral Code Card - Show for approved and pending */}
          {(creator?.status === 'approved' || creator?.status === 'pending') && (
            <div className="mt-6">
              {creator?.status === 'pending' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-t-xl p-3 text-center">
                  <p className="text-yellow-700 text-sm">
                    <span className="font-medium">Save your code!</span> It will be active once your application is approved.
                  </p>
                </div>
              )}
              <div className={creator?.status === 'pending' ? 'opacity-75' : ''}>
                <ReferralCodeCard code={creator?.referralCode} />
              </div>
            </div>
          )}
          
          {/* Referrals List */}
          {referralStats && referralStats.referrals.length > 0 && (
            <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Your Referrals</h3>
              <div className="space-y-3">
                {referralStats.referrals.map((referral, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{referral.name}</p>
                      <p className="text-sm text-gray-500">
                        Joined {new Date(referral.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+${referral.commission.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">commission</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Account Info */}
          <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{creator?.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Referral Code</p>
                <p className="font-mono font-medium text-gray-900">{creator?.referralCode}</p>
              </div>
              {creator?.approvedAt && (
                <div>
                  <p className="text-gray-500">Approved On</p>
                  <p className="font-medium text-gray-900">
                    {new Date(creator.approvedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
