'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormField, 
  FormLabel, 
  FormInput, 
  FormSelect,
  FormError 
} from '@/components/ui/form';

const followerCountOptions = [
  { id: '1k-10k', label: '1K - 10K' },
  { id: '10k-50k', label: '10K - 50K' },
  { id: '50k-100k', label: '50K - 100K' },
  { id: '100k-500k', label: '100K - 500K' },
  { id: '500k-1m', label: '500K - 1M' },
  { id: '1m+', label: '1M+' },
];

const audienceTypeOptions = [
  { id: 'couples', label: 'Primarily Couples' },
  { id: 'mixed', label: 'Mixed (Singles & Couples)' },
  { id: 'singles', label: 'Primarily Singles' },
];

export function CreatorApplicationForm({ referralCode: initialReferralCode = '' }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [successData, setSuccessData] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instagramHandle: '',
    tiktokHandle: '',
    followerCount: '',
    audienceType: '',
    niche: '',
    bio: '',
    referredByCode: initialReferralCode,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.instagramHandle.trim() && !formData.tiktokHandle.trim()) {
      newErrors.instagramHandle = 'Please provide at least one social media handle';
      newErrors.tiktokHandle = 'Please provide at least one social media handle';
    }
    
    if (!formData.followerCount) {
      newErrors.followerCount = 'Please select your follower count';
    }
    
    if (!formData.audienceType) {
      newErrors.audienceType = 'Please select your audience type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/creators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setIsSuccess(true);
        setSuccessData(data.creator);
        setFormData({
          name: '',
          email: '',
          phone: '',
          instagramHandle: '',
          tiktokHandle: '',
          followerCount: '',
          audienceType: '',
          niche: '',
          bio: '',
          referredByCode: '',
        });
      } else {
        setErrors({ submit: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center mb-6 text-green-500">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted! 🎉</h3>
        <p className="text-gray-600 mb-4">
          Thank you for your interest in partnering with Lovebae!
        </p>
        <p className="text-gray-500 mb-6">
          We'll review your application and get back to you within 3-5 business days.
        </p>
        {successData && (
          <div className="bg-[#FFF5F8] rounded-xl p-6 mb-6 max-w-sm mx-auto">
            <p className="text-sm text-gray-500 mb-2">Your referral code (active after approval):</p>
            <p className="font-mono text-xl font-bold text-red-500 mb-3">{successData.referralCode}</p>
            <p className="text-xs text-gray-400">
              Save this code or access it anytime from your dashboard
            </p>
          </div>
        )}
        <p className="text-sm text-gray-500 mb-4">
          Check your email at <span className="font-medium">{successData?.email}</span> for confirmation.
        </p>
        <a 
          href="/creators#get-code"
          className="inline-flex items-center justify-center bg-white text-red-500 border border-red-200 px-6 py-3 rounded-full font-semibold hover:bg-red-50 transition-colors"
        >
          Back to Creator Program
        </a>
        <p className="text-xs text-gray-400 mt-4">
          Forgot your code? You can retrieve it anytime on the creator program page.
        </p>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 mb-4 rounded">
          <p>{errors.submit}</p>
        </div>
      )}
      
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-100">
          Personal Information
        </h3>
        
        <FormField>
          <FormLabel htmlFor="name">Full Name <span className="text-red-500">*</span></FormLabel>
          <FormInput
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
          {errors.name && <FormError>{errors.name}</FormError>}
        </FormField>
        
        <div className="grid md:grid-cols-2 gap-4">
          <FormField>
            <FormLabel htmlFor="email">Email <span className="text-red-500">*</span></FormLabel>
            <FormInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@email.com"
            />
            {errors.email && <FormError>{errors.email}</FormError>}
          </FormField>
          
          <FormField>
            <FormLabel htmlFor="phone">Phone Number <span className="text-red-500">*</span></FormLabel>
            <FormInput
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && <FormError>{errors.phone}</FormError>}
          </FormField>
        </div>
      </div>
      
      {/* Social Media */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-100">
          Social Media
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <FormField>
            <FormLabel htmlFor="instagramHandle">
              Instagram Handle
              {!formData.tiktokHandle && <span className="text-red-500"> *</span>}
            </FormLabel>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">@</span>
              <FormInput
                id="instagramHandle"
                name="instagramHandle"
                value={formData.instagramHandle}
                onChange={handleChange}
                placeholder="username"
                className="pl-8"
              />
            </div>
            {errors.instagramHandle && <FormError>{errors.instagramHandle}</FormError>}
          </FormField>
          
          <FormField>
            <FormLabel htmlFor="tiktokHandle">
              TikTok Handle
              {!formData.instagramHandle && <span className="text-red-500"> *</span>}
            </FormLabel>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">@</span>
              <FormInput
                id="tiktokHandle"
                name="tiktokHandle"
                value={formData.tiktokHandle}
                onChange={handleChange}
                placeholder="username"
                className="pl-8"
              />
            </div>
            {errors.tiktokHandle && <FormError>{errors.tiktokHandle}</FormError>}
          </FormField>
        </div>
        
        <p className="text-xs text-gray-500">
          Provide at least one social media handle where you create content.
        </p>
      </div>
      
      {/* Audience Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-100">
          About Your Audience
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <FormField>
            <FormLabel htmlFor="followerCount">Total Followers <span className="text-red-500">*</span></FormLabel>
            <FormSelect
              id="followerCount"
              name="followerCount"
              value={formData.followerCount}
              onChange={handleChange}
            >
              <option value="">Select range</option>
              {followerCountOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </FormSelect>
            {errors.followerCount && <FormError>{errors.followerCount}</FormError>}
          </FormField>
          
          <FormField>
            <FormLabel htmlFor="audienceType">Audience Type <span className="text-red-500">*</span></FormLabel>
            <FormSelect
              id="audienceType"
              name="audienceType"
              value={formData.audienceType}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              {audienceTypeOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </FormSelect>
            {errors.audienceType && <FormError>{errors.audienceType}</FormError>}
          </FormField>
        </div>
        
        <FormField>
          <FormLabel htmlFor="niche">Content Niche <span className="text-gray-400">(Optional)</span></FormLabel>
          <FormInput
            id="niche"
            name="niche"
            value={formData.niche}
            onChange={handleChange}
            placeholder="e.g., Relationship advice, Couple vlogs, Lifestyle"
          />
        </FormField>
        
        <FormField>
          <FormLabel htmlFor="bio">Tell Us About Yourself <span className="text-gray-400">(Optional)</span></FormLabel>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
            placeholder="Why do you want to partner with Lovebae?"
          />
        </FormField>
      </div>
      
      {/* Referral Code */}
      <div className="space-y-4">
        <FormField>
          <FormLabel htmlFor="referredByCode">
            Referral Code <span className="text-gray-400">(Optional)</span>
          </FormLabel>
          <FormInput
            id="referredByCode"
            name="referredByCode"
            value={formData.referredByCode}
            onChange={handleChange}
            placeholder="LB-XXXXXX"
            className="font-mono"
          />
          <p className="text-xs text-gray-500 mt-1">
            If another creator referred you, enter their code here.
          </p>
        </FormField>
      </div>
      
      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 py-6 text-lg rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </div>
          ) : (
            'Submit Application'
          )}
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 text-center mt-6">
        By submitting, you agree to our{' '}
        <a href="/terms" className="text-red-500 hover:underline">Terms</a>{' '}
        and{' '}
        <a href="/privacy" className="text-red-500 hover:underline">Privacy Policy</a>.
      </p>
    </Form>
  );
}
