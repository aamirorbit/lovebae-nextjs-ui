'use client';

import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { setAgeConsentAtom, isAdultAtom, ageConsentAtom } from '@/lib/consent-store';

export function AgeConsent({ onConsentGiven, gameName = '' }) {
  const [consent] = useAtom(ageConsentAtom);
  const [, setAgeConsent] = useAtom(setAgeConsentAtom);
  const [selectedAge, setSelectedAge] = useState('');
  const [step, setStep] = useState('select'); // 'select' | 'blocked'
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Wait for client-side mount to avoid hydration issues with localStorage
  if (!mounted) return null;

  // If user has already consented and is 18+, skip
  if (consent.hasConsented && consent.age >= 18) {
    return null;
  }

  const handleAgeSelect = (value) => {
    setSelectedAge(value);
  };

  const handleContinue = async () => {
    const numericAge = parseInt(selectedAge);

    if (numericAge < 18) {
      setStep('blocked');
      return;
    }

    await setAgeConsent({ age: numericAge, hasConsented: true, gameAccessed: gameName });
    onConsentGiven?.();
  };

  const handleGoBack = () => {
    setStep('select');
    setSelectedAge('');
  };

  const handleLeaveSite = () => {
    setAgeConsent({ age: parseInt(selectedAge), hasConsented: false });
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  // Blocked screen for under 18
  if (step === 'blocked') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="mx-4 max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl animate-fade-in-up">
          <span className="text-6xl block mb-4">🚫</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Age Restriction</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our games are designed for adults 18+ only. We appreciate your interest and hope to see you back when you&apos;re of age!
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoBack}
              className="w-full px-6 py-3.5 rounded-full font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
            >
              ← Go Back
            </button>
            <button
              onClick={handleLeaveSite}
              className="w-full px-6 py-3.5 rounded-full font-semibold text-white bg-gray-600 hover:bg-gray-700 transition-all duration-300"
            >
              Leave Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Age selection screen
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
        <span className="text-6xl block mb-4">🎮</span>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Age Verification</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          <strong>Age Restriction:</strong> Our games are designed for adults 18+ only. Please confirm you&apos;re 18 or older to continue.
        </p>

        <div className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select your age range:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '15', label: 'Under 18' },
                { value: '18', label: '18-24' },
                { value: '25', label: '25-34' },
                { value: '35', label: '35+' }
              ].map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleAgeSelect(value)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
                    selectedAge === value
                      ? 'border-[#E7000B] bg-[#FFF0F3] text-[#E7000B]'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {selectedAge && (
            <button
              type="button"
              onClick={handleContinue}
              className="w-full px-6 py-4 rounded-full font-semibold text-white text-base bg-gradient-to-r from-[#E7000B] to-[#FF4757] shadow-[0_4px_20px_rgba(231,0,11,0.3)] hover:shadow-[0_6px_28px_rgba(231,0,11,0.4)] btn-press transition-all duration-300"
            >
              Continue
            </button>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Your age information is stored locally and helps us ensure appropriate content.
        </p>
      </div>
    </div>
  );
}