'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logger } from '@/lib/security';

export default function AdminLoginRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    logger.debug('Redirecting from old admin login to new location');
    router.replace('/login/admin');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to login page...</p>
    </div>
  );
} 