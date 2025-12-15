import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Cookies Policy | Lovebae - How We Use Cookies',
  description: 'Learn how Lovebae uses cookies and similar technologies. Understand what cookies we use, why we use them, and how to manage your preferences.',
  keywords: 'Lovebae cookies, cookie policy, website cookies, tracking technologies, cookie preferences',
  openGraph: {
    title: 'Cookies Policy | Lovebae',
    description: 'Learn how Lovebae uses cookies and similar technologies on our website and app.',
    url: 'https://lovebae.app/cookies',
    siteName: 'Lovebae',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lovebae.app/cookies',
  },
};

export default function CookiesPolicy() {
  return (
    <main className="bg-[#FFF5F5] min-h-screen">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#E53935] mb-2">Cookies Policy</h1>
          <p className="text-gray-500 text-sm mb-8">Last Updated: December 15, 2025</p>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">Introduction</h2>
            <p>
              Lovebae ("we," "our," or "us") uses cookies and similar technologies on our website and mobile application
              (collectively, the "Services"). This Cookies Policy explains how we use cookies, what types of cookies we use, and
              how you can control cookies.
            </p>
            <p className="mt-4">
              By using our Services, you consent to the use of cookies as described in this policy.
            </p>
            
            <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your browser or device when you visit a website. They allow the website
              to recognize your device and remember if you've been to the website before. Cookies are widely used to enhance your
              browsing experience, remember your preferences, and help us understand how people use our Services.
            </p>
            <p className="mt-4">
              In addition to cookies, we may use other similar technologies, such as web beacons, pixels, and local storage. These
              technologies work in a similar way to cookies and allow us to track your usage of our Services.
            </p>
            
            <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">Types of Cookies We Use</h2>
            <p>We use the following types of cookies:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <span className="font-medium">Essential Cookies:</span> These cookies are necessary for the Services to function properly.
                They enable core functionality such as security, network management, and account access. You cannot opt out of essential
                cookies as the Services would not function properly without them.
              </li>
              <li>
                <span className="font-medium">Functional Cookies:</span> These cookies enhance the functionality of our Services by storing
                your preferences. For example, they might remember your language preference or location.
              </li>
              <li>
                <span className="font-medium">Performance and Analytics Cookies:</span> These cookies collect information about how you use
                our Services, such as which pages you visit most often and if you receive any error messages. This helps us improve how our
                Services work and understand how users interact with them.
              </li>
            </ul>
            
            <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>To provide and maintain our Services</li>
              <li>To authenticate users and prevent fraudulent use of user accounts</li>
              <li>To remember information about your preferences and customize our Services to better suit your needs</li>
              <li>To understand and analyze how you use our Services and to improve them</li>
              <li>To gather demographic information about our user base as a whole</li>
            </ul>
            <p className="mt-4">
              <strong>The information we collect through cookies will be used solely to improve the overall user experience on our platform
              and will not be shared with third parties for advertising purposes.</strong>
            </p>
            
            <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">Third-Party Cookies</h2>
            <p>
              We may use third-party service providers to help us analyze how our Services are used. These service providers may use cookies
              and similar technologies to collect information about your use of our Services and other websites. This information may be used
              to analyze and track data, determine the popularity of certain content, and better understand your online activity.
            </p>
            <p className="mt-4">
              We do not permit any third-party advertising networks to collect information about your use of our Services for their own advertising purposes.
            </p>
            
            <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">How Long Do Cookies Stay on My Device?</h2>
            <p>The length of time a cookie will remain on your device depends on whether it is a "persistent" or "session" cookie.</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <span className="font-medium">Session cookies:</span> These cookies remain on your device until you close your browser.
                When you close your browser, these cookies are automatically removed.
              </li>
              <li>
                <span className="font-medium">Persistent cookies:</span> These cookies remain on your device for a specified period of time
                or until you delete them manually. How long a persistent cookie remains on your device varies from cookie to cookie.
              </li>
            </ul>
            
            <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">Your Cookie Choices</h2>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites
              to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you.
            </p>
            <p className="mt-4">To manage your cookie preferences, you can:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <span className="font-medium">Browser Settings:</span> Most browsers allow you to refuse to accept cookies and to delete
                cookies. The methods for doing so vary from browser to browser. You can find instructions for popular browsers:
                <ul className="list-disc pl-6 mt-2">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#E53935] hover:underline">Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-[#E53935] hover:underline">Firefox</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#E53935] hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#E53935] hover:underline">Edge</a></li>
                </ul>
              </li>
            </ul>
            <p className="mt-4">
              Please note that blocking cookies may have a negative impact on the functionality of many websites, including our Services.
            </p>
            
            <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">Changes to This Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page
              and updating the "Last Updated" date at the top of this Cookie Policy.
            </p>
            
            <h2 className="text-xl font-bold text-[#E53935] mt-8 mb-4 pb-2 border-b-2 border-[#FFCDD2]">Contact Us</h2>
            <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us at:</p>
            <p className="mt-4">
              Lovebae<br />
              Email: <a href="mailto:privacy@lovebae.app" className="text-[#E53935] hover:underline">privacy@lovebae.app</a>
            </p>
          </div>
          
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
