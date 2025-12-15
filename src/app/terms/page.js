import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Terms of Service | Lovebae - User Agreement',
  description: 'Read Lovebae\'s Terms of Service. Understand your rights, responsibilities, and our policies for using the couples app.',
  keywords: 'Lovebae terms of service, couples app terms, user agreement, app policies, terms and conditions',
  openGraph: {
    title: 'Terms of Service | Lovebae',
    description: 'Read and understand Lovebae\'s Terms of Service and user agreement.',
    url: 'https://lovebae.app/terms',
    siteName: 'Lovebae',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lovebae.app/terms',
  },
};

export default function TermsOfService() {
  return (
    <main className="bg-[#FFF5F5] min-h-screen">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#E53935] mb-2">Terms of Service</h1>
          <p className="text-gray-500 text-sm mb-8">Last Updated: December 15, 2025</p>
          
          <p className="text-gray-600 mb-8">
            Welcome to Lovebae! These Terms of Service ("Terms") govern your use of the Lovebae mobile application ("App") and related services. By using Lovebae, you agree to these Terms.
          </p>

          {/* Section 1 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-600 mb-4">
            By downloading, installing, or using Lovebae, you agree to be bound by these Terms. If you do not agree, do not use the App.
          </p>

          {/* Section 2 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            2. Eligibility
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>You must be at least 13 years old to use Lovebae</li>
            <li>If under 18, you need parental/guardian consent</li>
            <li>You must provide accurate information when creating an account</li>
          </ul>

          {/* Section 3 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            3. Account & Partner Connection
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>You are responsible for maintaining account security</li>
            <li>You may only connect with one partner at a time</li>
            <li>You consent to sharing your content with your connected partner</li>
            <li>You may disconnect from your partner at any time</li>
          </ul>

          {/* Section 4 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            4. User Content
          </h2>
          <p className="text-gray-600 mb-2">
            You retain ownership of content you create (doodles, letters, etc.). By using Lovebae, you grant us a license to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Store and transmit your content to provide the service</li>
            <li>Display your content to your connected partner</li>
            <li>Create backups for data safety</li>
          </ul>

          <p className="font-semibold text-gray-800 mb-2">Content Guidelines:</p>
          <p className="text-gray-600 mb-2">You agree not to share content that is:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Illegal, harmful, or threatening</li>
            <li>Harassing or abusive</li>
            <li>Infringing on intellectual property rights</li>
            <li>Sexually explicit involving minors</li>
            <li>Spam or deceptive</li>
          </ul>

          {/* Section 5 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            5. Subscription & Payments
          </h2>
          
          <div className="bg-[#FFF5F5] p-4 rounded-lg border-l-4 border-[#E53935] my-4">
            <strong>2-for-1 Subscription:</strong> When you subscribe to Premium, your connected partner automatically receives Premium access at no additional cost. This benefit applies only while you remain connected and your subscription is active.
          </div>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">Subscription Plans</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li><strong>Monthly:</strong> Billed monthly, cancel anytime</li>
            <li><strong>Yearly:</strong> Billed annually, best value</li>
            <li><strong>Lifetime:</strong> One-time payment, permanent access</li>
          </ul>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">Billing & Cancellation</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Payments are processed through Apple App Store or Google Play Store</li>
            <li>Subscriptions auto-renew unless cancelled 24 hours before renewal</li>
            <li>Cancel anytime in your device's subscription settings</li>
            <li>No refunds for partial subscription periods</li>
            <li>Free trial converts to paid subscription if not cancelled</li>
          </ul>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">How to Cancel</h3>
          <p className="text-gray-600 mb-2"><strong>iOS:</strong> Settings → [Your Name] → Subscriptions → Lovebae → Cancel</p>
          <p className="text-gray-600 mb-4"><strong>Android:</strong> Play Store → Menu → Subscriptions → Lovebae → Cancel</p>

          {/* Section 6 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            6. Hearts Currency
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Hearts are virtual currency earned through app activities</li>
            <li>Hearts have no real-world monetary value</li>
            <li>Hearts cannot be transferred, sold, or exchanged for cash</li>
            <li>We may adjust heart earning rates at any time</li>
            <li>Hearts may expire if unused for extended periods</li>
          </ul>

          {/* Section 7 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            7. Acceptable Use
          </h2>
          <p className="text-gray-600 mb-2">You agree NOT to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Use the App for any illegal purpose</li>
            <li>Attempt to hack, reverse engineer, or disrupt the service</li>
            <li>Create fake accounts or impersonate others</li>
            <li>Use automated systems to access the App</li>
            <li>Share your account credentials</li>
            <li>Circumvent subscription requirements</li>
          </ul>

          {/* Section 8 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            8. Termination
          </h2>
          <p className="text-gray-600 mb-2">We may suspend or terminate your account if you:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Violate these Terms</li>
            <li>Engage in harmful behavior</li>
            <li>Abuse the service or other users</li>
          </ul>
          <p className="text-gray-600 mb-4">You may delete your account at any time in the App settings.</p>

          {/* Section 9 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            9. Disclaimers
          </h2>
          <div className="bg-[#FFF3E0] p-4 rounded-lg border-l-4 border-[#FF9800] my-4">
            <p className="font-bold">THE APP IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.</p>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>We do not guarantee uninterrupted or error-free service</li>
            <li>We are not responsible for content shared between users</li>
            <li>We do not guarantee relationship outcomes</li>
            <li>Features may change or be discontinued</li>
          </ul>

          {/* Section 10 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            10. Limitation of Liability
          </h2>
          <p className="text-gray-600 mb-2">To the maximum extent permitted by law:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>We are not liable for indirect, incidental, or consequential damages</li>
            <li>Our total liability is limited to amounts you paid us in the past 12 months</li>
            <li>We are not liable for third-party actions or content</li>
          </ul>

          {/* Section 11 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            11. Privacy
          </h2>
          <p className="text-gray-600 mb-4">
            Your use of Lovebae is also governed by our <a href="/privacy" className="text-[#E53935] hover:underline">Privacy Policy</a>, which is incorporated into these Terms.
          </p>

          {/* Section 12 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            12. Intellectual Property
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Lovebae, its logo, and features are our intellectual property</li>
            <li>You may not copy, modify, or distribute our App or content</li>
            <li>Feedback you provide may be used to improve the App</li>
          </ul>

          {/* Section 13 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            13. Changes to Terms
          </h2>
          <p className="text-gray-600 mb-4">
            We may update these Terms at any time. Significant changes will be notified through the App. Continued use after changes constitutes acceptance.
          </p>

          {/* Section 14 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            14. Dispute Resolution
          </h2>
          <p className="text-gray-600 mb-4">
            Any disputes will be resolved through binding arbitration, except where prohibited by law. You waive the right to participate in class actions.
          </p>

          {/* Section 15 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            15. General Provisions
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>These Terms constitute the entire agreement between you and Lovebae</li>
            <li>If any provision is unenforceable, the rest remain in effect</li>
            <li>Our failure to enforce a right does not waive that right</li>
            <li>These Terms are governed by applicable laws</li>
          </ul>

          {/* Section 16 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            16. Contact Us
          </h2>
          <p className="text-gray-600 mb-2">Questions about these Terms?</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Email: <a href="mailto:legal@lovebae.app" className="text-[#E53935] hover:underline">legal@lovebae.app</a></li>
            <li>Support: <a href="https://lovebae.app/support" className="text-[#E53935] hover:underline">lovebae.app/support</a></li>
          </ul>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500">
            <p>Lovebae - Bringing Hearts Closer</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
