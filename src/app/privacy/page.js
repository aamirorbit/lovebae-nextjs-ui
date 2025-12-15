import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | Lovebae - How We Protect Your Data',
  description: 'Read Lovebae\'s Privacy Policy. Learn how we collect, use, and protect your personal information. Your privacy and data security are our top priorities.',
  keywords: 'Lovebae privacy policy, couples app privacy, data protection, user privacy, app data security',
  openGraph: {
    title: 'Privacy Policy | Lovebae',
    description: 'Learn how Lovebae collects, uses, and protects your personal information. Your privacy matters to us.',
    url: 'https://lovebae.app/privacy',
    siteName: 'Lovebae',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lovebae.app/privacy',
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-[#FFF5F5] min-h-screen">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#E53935] mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-8">Last Updated: December 15, 2025</p>
          
          <p className="text-gray-600 mb-8">
            Welcome to Lovebae! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our mobile application.
          </p>

          {/* Section 1 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            1. Information We Collect
          </h2>
          
          <h3 className="font-semibold text-gray-800 mt-4 mb-2">Information You Provide</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li><strong>Account Information:</strong> Email address for authentication</li>
            <li><strong>Profile Information:</strong> Display name, profile picture</li>
            <li><strong>Partner Connection:</strong> Partner invite codes and relationship data</li>
            <li><strong>Content:</strong> Doodles, love letters, mood entries, check-in responses</li>
            <li><strong>Payment Information:</strong> Processed securely by Stripe (we don't store card details)</li>
          </ul>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">Information Collected Automatically</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers</li>
            <li><strong>Usage Data:</strong> Features used, session duration, interaction patterns</li>
            <li><strong>Push Notification Tokens:</strong> For sending notifications</li>
          </ul>

          {/* Section 2 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>To provide and maintain the Lovebae service</li>
            <li>To connect you with your partner</li>
            <li>To sync your shared content (doodles, pet, moods)</li>
            <li>To send push notifications about partner activity</li>
            <li>To process subscription payments</li>
            <li>To improve our app and develop new features</li>
            <li>To respond to your support requests</li>
          </ul>

          {/* Section 3 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            3. Information Sharing
          </h2>
          
          <div className="bg-[#FFF5F5] p-4 rounded-lg border-l-4 border-[#E53935] my-4">
            <strong>Your Partner:</strong> Content you create (doodles, letters, moods) is shared with your connected partner. This is the core functionality of Lovebae.
          </div>

          <p className="text-gray-600 mb-2">We may share information with:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li><strong>Service Providers:</strong> Companies that help us operate (cloud hosting, analytics, payment processing)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
          </ul>

          <p className="font-semibold text-gray-800 mb-2">We DO NOT:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Sell your personal information</li>
            <li>Share your content with advertisers</li>
            <li>Use your data for targeted advertising</li>
          </ul>

          {/* Section 4 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            4. Third-Party Services
          </h2>
          <p className="text-gray-600 mb-2">We use the following third-party services:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li><strong>Firebase (Google):</strong> Authentication, push notifications, analytics</li>
            <li><strong>Stripe:</strong> Payment processing</li>
            <li><strong>AWS/Cloudinary:</strong> Image storage</li>
          </ul>
          <p className="text-gray-600 mb-4">Each service has its own privacy policy governing their data practices.</p>

          {/* Section 5 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            5. Data Security
          </h2>
          <p className="text-gray-600 mb-2">We implement appropriate security measures:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>All data transmitted over HTTPS/TLS encryption</li>
            <li>Secure token-based authentication</li>
            <li>Regular security updates</li>
            <li>Access controls on our systems</li>
          </ul>

          {/* Section 6 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            6. Data Retention
          </h2>
          <p className="text-gray-600 mb-2">We retain your data for as long as your account is active. When you delete your account:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Your profile and personal data are deleted within 30 days</li>
            <li>Shared content with your partner may be retained for their account</li>
            <li>Some data may be retained for legal/business requirements</li>
          </ul>

          {/* Section 7 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            7. Your Rights
          </h2>
          <p className="text-gray-600 mb-2">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li><strong>Access:</strong> Request a copy of your data</li>
            <li><strong>Correction:</strong> Update inaccurate information</li>
            <li><strong>Deletion:</strong> Delete your account and data</li>
            <li><strong>Portability:</strong> Receive your data in a portable format</li>
          </ul>
          <p className="text-gray-600 mb-4">
            To exercise these rights, contact us at <a href="mailto:privacy@lovebae.app" className="text-[#E53935] hover:underline">privacy@lovebae.app</a>
          </p>

          {/* Section 8 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            8. Children's Privacy
          </h2>
          <p className="text-gray-600 mb-4">
            Lovebae is not intended for children under 13. We do not knowingly collect information from children under 13. If you believe we have collected such information, please contact us immediately.
          </p>

          {/* Section 9 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            9. International Data Transfers
          </h2>
          <p className="text-gray-600 mb-4">
            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
          </p>

          {/* Section 10 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            10. Changes to This Policy
          </h2>
          <p className="text-gray-600 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of significant changes through the app or email. Continued use after changes constitutes acceptance.
          </p>

          {/* Section 11 */}
          <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">
            11. Contact Us
          </h2>
          <p className="text-gray-600 mb-2">If you have questions about this Privacy Policy:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Email: <a href="mailto:privacy@lovebae.app" className="text-[#E53935] hover:underline">privacy@lovebae.app</a></li>
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
