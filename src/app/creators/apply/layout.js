export const metadata = {
  title: 'Apply to Creator Program | Lovebae - Become a Partner',
  description: 'Apply to become a Lovebae creator! Join our influencer program and earn by promoting the #1 couples app. Quick application, 10% lifetime referral earnings.',
  keywords: 'apply Lovebae creator, influencer application, couples app partnership, content creator program, earn promoting apps',
  openGraph: {
    title: 'Apply to Creator Program | Lovebae',
    description: 'Apply to become a Lovebae creator! Join our influencer program and earn by promoting the #1 couples app.',
    url: 'https://lovebae.app/creators/apply',
    siteName: 'Lovebae',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apply to Creator Program | Lovebae',
    description: 'Apply to become a Lovebae creator! Earn 10% lifetime referral commissions.',
  },
  alternates: {
    canonical: 'https://lovebae.app/creators/apply',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CreatorApplyLayout({ children }) {
  return children;
}
