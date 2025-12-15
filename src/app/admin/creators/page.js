'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const followerLabels = {
  '1k-10k': '1K - 10K',
  '10k-50k': '10K - 50K',
  '50k-100k': '50K - 100K',
  '100k-500k': '100K - 500K',
  '500k-1m': '500K - 1M',
  '1m+': '1M+',
};

const audienceLabels = {
  couples: 'Couples',
  singles: 'Singles',
  mixed: 'Mixed',
};

export default function AdminCreatorsPage() {
  const [creators, setCreators] = useState([]);
  const [stats, setStats] = useState({ pending: { count: 0 }, approved: { count: 0 }, rejected: { count: 0 } });
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchCreators = async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: '20' });
      if (statusFilter) params.append('status', statusFilter);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await fetch(`/api/admin/creators?${params}`);
      if (!response.ok) throw new Error('Failed to fetch creators');
      
      const data = await response.json();
      setCreators(data.creators);
      setStats(data.stats);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, [statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCreators(1);
  };

  const updateCreatorStatus = async (creatorId, newStatus) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/creators/${creatorId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) throw new Error('Failed to update creator');
      
      // Refresh the list
      await fetchCreators(pagination.page);
      setSelectedCreator(null);
    } catch (err) {
      alert('Error updating creator: ' + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteCreator = async (creatorId) => {
    if (!confirm('Are you sure you want to delete this creator application?')) return;
    
    try {
      const response = await fetch(`/api/creators/${creatorId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete creator');
      
      await fetchCreators(pagination.page);
      setSelectedCreator(null);
    } catch (err) {
      alert('Error deleting creator: ' + err.message);
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="text-red-600 hover:text-red-700 text-sm mb-2 inline-block">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Creator Applications</h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div 
          onClick={() => setStatusFilter('')}
          className={`bg-white rounded-xl shadow p-4 cursor-pointer transition-all ${!statusFilter ? 'ring-2 ring-red-500' : 'hover:shadow-lg'}`}
        >
          <h3 className="text-sm font-medium text-gray-500">All Creators</h3>
          <p className="text-2xl font-bold text-gray-900">
            {stats.pending.count + stats.approved.count + stats.rejected.count}
          </p>
        </div>
        <div 
          onClick={() => setStatusFilter('pending')}
          className={`bg-white rounded-xl shadow p-4 cursor-pointer transition-all ${statusFilter === 'pending' ? 'ring-2 ring-yellow-500' : 'hover:shadow-lg'}`}
        >
          <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending.count}</p>
        </div>
        <div 
          onClick={() => setStatusFilter('approved')}
          className={`bg-white rounded-xl shadow p-4 cursor-pointer transition-all ${statusFilter === 'approved' ? 'ring-2 ring-green-500' : 'hover:shadow-lg'}`}
        >
          <h3 className="text-sm font-medium text-gray-500">Approved</h3>
          <p className="text-2xl font-bold text-green-600">{stats.approved.count}</p>
        </div>
        <div 
          onClick={() => setStatusFilter('rejected')}
          className={`bg-white rounded-xl shadow p-4 cursor-pointer transition-all ${statusFilter === 'rejected' ? 'ring-2 ring-red-500' : 'hover:shadow-lg'}`}
        >
          <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
          <p className="text-2xl font-bold text-red-600">{stats.rejected.count}</p>
        </div>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or social handle..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Creators Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : creators.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No creator applications found.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Creator
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Social Media
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Followers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Audience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referrals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {creators.map((creator) => (
                <tr key={creator.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{creator.name}</div>
                      <div className="text-sm text-gray-500">{creator.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      {creator.instagramHandle && (
                        <a 
                          href={`https://instagram.com/${creator.instagramHandle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:underline block"
                        >
                          @{creator.instagramHandle}
                        </a>
                      )}
                      {creator.tiktokHandle && (
                        <a 
                          href={`https://tiktok.com/@${creator.tiktokHandle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:underline block"
                        >
                          @{creator.tiktokHandle}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {followerLabels[creator.followerCount] || creator.followerCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {audienceLabels[creator.audienceType] || creator.audienceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[creator.status]}`}>
                      {creator.status.charAt(0).toUpperCase() + creator.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {creator.referralCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(creator.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedCreator(creator)}
                      className="text-red-600 hover:text-red-900"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => fetchCreators(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => fetchCreators(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{pagination.page}</span> of{' '}
                  <span className="font-medium">{pagination.totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => fetchCreators(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => fetchCreators(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Creator Detail Modal */}
      {selectedCreator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Creator Details</h2>
                <button
                  onClick={() => setSelectedCreator(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-2xl">
                    {selectedCreator.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedCreator.name}</h3>
                    <p className="text-gray-500">{selectedCreator.email}</p>
                  </div>
                  <span className={`ml-auto px-3 py-1 text-sm font-medium rounded-full ${statusColors[selectedCreator.status]}`}>
                    {selectedCreator.status.charAt(0).toUpperCase() + selectedCreator.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedCreator.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Referral Code</p>
                    <p className="font-mono font-medium">{selectedCreator.referralCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Instagram</p>
                    {selectedCreator.instagramHandle ? (
                      <a 
                        href={`https://instagram.com/${selectedCreator.instagramHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:underline font-medium"
                      >
                        @{selectedCreator.instagramHandle}
                      </a>
                    ) : (
                      <p className="text-gray-400">Not provided</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">TikTok</p>
                    {selectedCreator.tiktokHandle ? (
                      <a 
                        href={`https://tiktok.com/@${selectedCreator.tiktokHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:underline font-medium"
                      >
                        @{selectedCreator.tiktokHandle}
                      </a>
                    ) : (
                      <p className="text-gray-400">Not provided</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Follower Count</p>
                    <p className="font-medium">{followerLabels[selectedCreator.followerCount]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Audience Type</p>
                    <p className="font-medium">{audienceLabels[selectedCreator.audienceType]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Referred By</p>
                    <p className="font-mono">{selectedCreator.referredByCode || 'None'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Referral Count</p>
                    <p className="font-medium">{selectedCreator.referralCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Earnings</p>
                    <p className="font-medium">${selectedCreator.earnings.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Referral Earnings</p>
                    <p className="font-medium">${selectedCreator.referralEarnings.toFixed(2)}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-1">Applied On</p>
                  <p>{new Date(selectedCreator.createdAt).toLocaleString()}</p>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t flex gap-3">
                  {selectedCreator.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateCreatorStatus(selectedCreator.id, 'approved')}
                        disabled={isUpdating}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {isUpdating ? 'Updating...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => updateCreatorStatus(selectedCreator.id, 'rejected')}
                        disabled={isUpdating}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        {isUpdating ? 'Updating...' : 'Reject'}
                      </button>
                    </>
                  )}
                  {selectedCreator.status === 'approved' && (
                    <button
                      onClick={() => updateCreatorStatus(selectedCreator.id, 'rejected')}
                      disabled={isUpdating}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      {isUpdating ? 'Updating...' : 'Revoke Approval'}
                    </button>
                  )}
                  {selectedCreator.status === 'rejected' && (
                    <button
                      onClick={() => updateCreatorStatus(selectedCreator.id, 'approved')}
                      disabled={isUpdating}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {isUpdating ? 'Updating...' : 'Approve'}
                    </button>
                  )}
                  <button
                    onClick={() => deleteCreator(selectedCreator.id)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
