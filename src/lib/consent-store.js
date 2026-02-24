import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Age consent atom with localStorage persistence
export const ageConsentAtom = atomWithStorage('lovebae-age-consent', {
  hasConsented: false,
  consentedAt: null,
  age: null
});

// Computed atom to check if user is 18+
export const isAdultAtom = atom((get) => {
  const consent = get(ageConsentAtom);
  return consent.hasConsented && consent.age >= 18;
});

// Action to set age consent
export const setAgeConsentAtom = atom(null, async (get, set, { age, hasConsented, gameAccessed }) => {
  const consentData = {
    hasConsented: hasConsented ?? (age >= 18),
    consentedAt: new Date().toISOString(),
    age: age
  };

  // Store in localStorage via atomWithStorage
  set(ageConsentAtom, consentData);

  // Optional: Send to backend for additional persistence
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: age,
          hasConsented: consentData.hasConsented,
          gameAccessed: gameAccessed || ''
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Age consent stored in backend:', result);
      } else {
        console.warn('Failed to store consent in backend:', response.statusText);
      }
    } catch (error) {
      console.warn('Error storing consent in backend:', error);
      // Continue with localStorage only - don't fail the user experience
    }
  }
});

// Action to reset consent (for testing or GDPR compliance)
export const resetConsentAtom = atom(null, (get, set) => {
  set(ageConsentAtom, {
    hasConsented: false,
    consentedAt: null,
    age: null
  });

  if (typeof window !== 'undefined') {
    localStorage.removeItem('lovebae-age-consent');
  }
});