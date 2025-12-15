'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logger, clearAuthData } from '@/lib/security';

export default function AdminTemplate({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const isModerator = userData?.role === 'moderator';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        logger.debug('Starting authentication check in admin template');
        const response = await fetch('/api/admin/verify-auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        const data = await response.json();
        
        if (response.ok && data.authenticated) {
          logger.info({
            message: 'User authenticated in admin template',
            userId: data.user?.id,
            role: data.user?.role
          });
          
          setIsAuthenticated(true);
          setUserData(data.user);
        } else {
          logger.warn({
            message: 'Authentication failed in admin template',
            status: response.status,
            error: data.error
          });
          
          if (response.status === 401) {
            logger.debug('Received 401, clearing authentication state');
            await clearAuthData();
          }
          
          setIsAuthenticated(false);
          router.push('/login/admin');
        }
      } catch (error) {
        logger.error({
          message: 'Authentication check error in admin template',
          error: error.message
        });
        
        await clearAuthData();
        
        toast.error('Authentication error. Please try again.');
        setIsAuthenticated(false);
        router.push('/login/admin');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const isActive = (path) => {
    return pathname === path;
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (loading) {
    logger.debug('Rendering loading state in admin template');
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    logger.debug('User not authenticated, template will not render children');
    return null;
  }
  
  logger.debug({
    message: 'Rendering admin template with authenticated user',
    userId: userData?.id,
    role: userData?.role,
    showingRestrictedView: isModerator
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white/80 backdrop-blur-sm border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            {!sidebarCollapsed && (
              <div className="font-bold flex items-center">
                <span className="text-gray-900 text-xl">Love</span>
                <span className="text-red-500 text-xl">bae</span>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {sidebarCollapsed ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* User info */}
        {userData && !sidebarCollapsed && (
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm text-gray-700">
              {userData.email?.split('@')[0]}
            </p>
            <span className="text-xs text-gray-600 mt-1 inline-block px-2 py-1 bg-gray-100 rounded-full">
              {isModerator ? 'Moderator' : 'Admin'}
            </span>
          </div>
        )}
        
        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
          {!isModerator && (
            <Link 
              href="/admin"
              className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'px-3'} py-3 rounded-lg transition-colors duration-200 group ${
                isActive('/admin') 
                  ? 'bg-red-50 text-red-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title="Dashboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`${sidebarCollapsed ? 'h-6 w-6' : 'h-5 w-5 mr-3'}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              {!sidebarCollapsed && <span>Dashboard</span>}
            </Link>
          )}

          {!isModerator && (
            <Link 
              href="/admin/waitlist"
              className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'px-3'} py-3 rounded-lg transition-colors duration-200 group ${
                isActive('/admin/waitlist') 
                  ? 'bg-red-50 text-red-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title="Waitlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`${sidebarCollapsed ? 'h-6 w-6' : 'h-5 w-5 mr-3'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {!sidebarCollapsed && <span>Waitlist</span>}
            </Link>
          )}
        </nav>

        <div className={`p-4 border-t border-gray-200 ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
          <Button 
            onClick={async () => {
              try {
                await clearAuthData();
                router.push('/login/admin');
              } catch (error) {
                logger.error({
                  action: 'logout_error',
                  error: error.message
                });
                router.push('/login/admin');
              }
            }}
            className={`${sidebarCollapsed ? 'p-2 w-10 h-10' : 'w-full'} bg-red-600 hover:bg-red-700 text-white flex items-center justify-center`}
            title="Logout"
          >
            {sidebarCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                <path d="M8.293 9.293a1 1 0 011.414 0L11 10.586V7a1 1 0 112 0v3.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
              </svg>
            ) : (
              "Logout"
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              {isModerator ? 'Moderator Panel' : 'Admin Panel'}
              <span className="ml-3 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {userData?.role}
              </span>
            </h1>
            
            {/* Mobile sidebar toggle */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-white p-6">
          <ToastContainer position="top-right" autoClose={5000} />
          {children}
        </main>
      </div>
    </div>
  );
}
