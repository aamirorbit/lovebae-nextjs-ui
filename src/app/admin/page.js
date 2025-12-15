'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    total: 0,
    healers: 0,
    ambassadors: 0,
    waitlist: 0,
    creators: 0,
    creatorsPending: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const response = await fetch('/api/admin/waitlist');
        if (!response.ok) {
          throw new Error('Failed to fetch waitlist counts');
        }
        const data = await response.json();
        setCounts(data.counts);
      } catch (err) {
        console.error('Error fetching waitlist counts:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCounts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <Link 
          href="/admin/waitlist"
          className="block transform transition-all duration-200 hover:scale-105"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-600 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Entries</h3>
            <p className="text-3xl font-bold text-red-600">{counts.total}</p>
            <p className="text-sm text-gray-500 mt-2">All entries in the system</p>
          </div>
        </Link>

        <Link 
          href="/admin/founding-healers"
          className="block transform transition-all duration-200 hover:scale-105"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Healers</h3>
            <p className="text-3xl font-bold text-blue-600">{counts.healers}</p>
            <p className="text-sm text-gray-500 mt-2">All Founding Healer applications</p>
          </div>
        </Link>

        <Link 
          href="/admin/ambassadors"
          className="block transform transition-all duration-200 hover:scale-105"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Ambassadors</h3>
            <p className="text-3xl font-bold text-green-600">{counts.ambassadors}</p>
            <p className="text-sm text-gray-500 mt-2">All Soul Ambassador applications</p>
          </div>
        </Link>

        <Link 
          href="/admin/waitlist"
          className="block transform transition-all duration-200 hover:scale-105"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Waitlist Entries</h3>
            <p className="text-3xl font-bold text-purple-600">{counts.waitlist}</p>
            <p className="text-sm text-gray-500 mt-2">All service waitlist entries</p>
          </div>
        </Link>

        <Link 
          href="/admin/creators"
          className="block transform transition-all duration-200 hover:scale-105"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-600 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Creator Applications</h3>
            <p className="text-3xl font-bold text-pink-600">{counts.creators}</p>
            <p className="text-sm text-gray-500 mt-2">{counts.creatorsPending} pending review</p>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Database Connection</span>
            <span className="text-green-600 font-medium">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">API Status</span>
            <span className="text-green-600 font-medium">Operational</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Last Updated</span>
            <span className="text-gray-600">{new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 