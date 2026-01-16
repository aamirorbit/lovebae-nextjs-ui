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

// How they heard about Lovebae options
const sourceOptions = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'twitter', label: 'Twitter/X' },
  { id: 'friend', label: 'Friend or Partner' },
  { id: 'appstore', label: 'App Store' },
  { id: 'google', label: 'Google Search' },
  { id: 'other', label: 'Other' },
];

export function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    partnerEmail: '',
    source: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Only require email - name is optional
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.partnerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.partnerEmail)) {
      newErrors.partnerEmail = 'Please enter a valid email address';
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
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok || response.status === 200) {
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          partnerEmail: '',
          source: '',
        });
      } else if (response.status === 400 && data.message) {
        // Show friendly validation message
        setErrors({ submit: data.message });
      } else {
        // Only show error for server errors
        setErrors({ submit: 'Something went wrong. Please try again.' });
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
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-serif text-gray-900 mb-4">You're on the list! 💕</h3>
        <p className="text-gray-600 mb-4">
          We'll let you know as soon as Lovebae is ready for you and your partner.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Check your email for a confirmation.
        </p>
        <Button 
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="border-[#E7000B] text-[#E7000B] hover:bg-red-50"
        >
          Add Another Email
        </Button>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="p-4 bg-red-50 border-l-4 border-[#E7000B] text-red-700 mb-4 rounded">
          <p>{errors.submit}</p>
        </div>
      )}
      
      <FormField>
        <FormLabel htmlFor="name">Your Name <span className="text-gray-400">(Optional)</span></FormLabel>
        <FormInput
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        {errors.name && <FormError>{errors.name}</FormError>}
      </FormField>
      
      <FormField>
        <FormLabel htmlFor="email">Your Email <span className="text-[#E7000B]">*</span></FormLabel>
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
        <FormLabel htmlFor="partnerEmail">Partner's Email <span className="text-gray-400">(Optional)</span></FormLabel>
        <FormInput
          id="partnerEmail"
          name="partnerEmail"
          type="email"
          value={formData.partnerEmail}
          onChange={handleChange}
          placeholder="partner@email.com"
        />
        <p className="text-xs text-gray-500 mt-1">We'll invite them to join you when we launch</p>
        {errors.partnerEmail && <FormError>{errors.partnerEmail}</FormError>}
      </FormField>
      
      <FormField>
        <FormLabel htmlFor="source">How did you hear about us? <span className="text-gray-400">(Optional)</span></FormLabel>
        <FormSelect
          id="source"
          name="source"
          value={formData.source}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          {sourceOptions.map(option => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </FormSelect>
      </FormField>
      
      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-[#E7000B] hover:bg-[#C50009] py-6 text-lg rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Joining...
            </div>
          ) : (
            'Join the Waitlist 💕'
          )}
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 text-center mt-6">
        By joining, you agree to our{' '}
        <a href="/terms" className="text-[#E7000B] hover:underline">Terms</a>{' '}
        and{' '}
        <a href="/privacy" className="text-[#E7000B] hover:underline">Privacy Policy</a>.
      </p>
    </Form>
  );
} 
