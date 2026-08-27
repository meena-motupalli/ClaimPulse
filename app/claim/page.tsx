'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Claim, ClaimType } from '@/types/claim';
import { getStoredClaims } from '@/lib/storage';
import { ClaimCard } from '@/components/claim/ClaimCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Clock, Plus, Search, Filter } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ClaimHistoryPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load from local storage / mock initialization
    const data = getStoredClaims();
    setClaims(data);
    setIsLoading(false);
  }, []);

  const filteredClaims = claims.filter((claim) => {
    const matchesFilter = filterType === 'ALL' || claim.claimType === filterType;
    const matchesSearch =
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.claimType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.currentStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (claim.notes && claim.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Clock className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Claim History & Saved Diagnoses
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Track and monitor all your active, settled, and flagged PF claims in one place.
          </p>
        </div>

        <Link
          href="/track"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Track New Claim
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Search Box */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, type, status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-400 mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['ALL', 'Form 19', 'Form 10C', 'Form 31', 'Transfer'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === type
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Claim Cards List */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
        </div>
      ) : filteredClaims.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredClaims.map((claim) => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={searchQuery ? 'No matching claims found' : 'No claims tracked yet'}
          description={
            searchQuery
              ? `No claims matched your search "${searchQuery}". Try clearing filters or entering a new claim.`
              : 'You have not tracked any claims yet. Start by entering your reported claim information.'
          }
        />
      )}
    </div>
  );
}
