'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { logger, clearAuthData } from '@/lib/security';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Check if already logged in and redirect if so
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/verify-auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        const data = await response.json();
        
        if (response.ok && data.authenticated) {
          logger.auth({
            action: 'already_authenticated',
            role: data.user?.role
          });
          
          // If already logged in, redirect to appropriate page
          if (data.user?.role === 'moderator') {
            router.push('/admin/blog');
          } else {
            router.push('/admin');
          }
        }
      } catch (error) {
        // User is not authenticated, so they can stay on the login page
        logger.debug({
          action: 'auth_check_login_page',
          error: error.message
        });
      }
    };
    
    checkAuth();
    
    // Log page view for analytics
    console.debug('Admin login page viewed');
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setLoginAttempts(prev => prev + 1);

    logger.auth({
      action: 'login_attempt',
      email: email.substring(0, 3) + '***', // Log partial email for troubleshooting
      attemptNumber: loginAttempts + 1
    });

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies with the request
      });

      const data = await response.json();

      if (!response.ok) {
        logger.auth({
          action: 'login_failed',
          email: email,
          error: data.message || 'Unknown error'
        });
        
        // Clear any stale auth data on failed login
        await clearAuthData();
        
        throw new Error(data.message || 'Login failed');
      }

      logger.auth({
        action: 'login_success',
        email: email,
        role: data.user?.role
      });

      // Check user role and redirect accordingly
      if (data.user && data.user.role === 'moderator') {
        console.debug('Redirecting moderator to blog management');
        // Moderators go straight to blog management
        router.push('/admin/blog');
      } else {
        console.debug('Redirecting admin to dashboard');
        // Admins go to the dashboard
        router.push('/admin');
      }
    } catch (err) {
      logger.error({
        action: 'login_error',
        email: email,
        error: err.message,
        stack: err.stack
      });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-serif text-gray-900 mb-6 text-center">Admin Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
} 