'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Claim } from '@/types/claim';
import { getStoredClaims } from '@/lib/storage';
import { INITIAL_MOCK_CLAIMS } from '@/data/mockClaims';
import { analyzeClaim, DEMO_CURRENT_DATE } from '@/lib/claimAnalyzer';
import { Clock, Search, ArrowRight, ShieldCheck, FileText, Filter } from 'lucide-react';

export default function ClaimListPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [filterType, setFilterType] = useState<string>('ALL');

  useEffect(() => {
    const stored = getStoredClaims();
    setClaims([...stored, ...INITIAL_MOCK_CLAIMS]);
  }, []);

  const filteredClaims = claims.filter((c) => {
    if (filterType === 'ALL') return true;
    if (filterType === 'REJECTED') return c.currentStatus === 'Rejected';
    if (filterType === 'SUBMITTED') return c.currentStatus === 'Claim Submitted';
    if (filterType === 'SETTLED') return c.currentStatus === 'Settled';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title & Filter Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Claim History & Demo Records</h1>
          <p className="text-xs text-slate-600">
            View stored claims and pre-configured hackathon demo records.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-900"
          >
            <option value="ALL">All Claim Statuses</option>
            <option value="SUBMITTED">Submitted / Pending</option>
            <option value="REJECTED">Rejected Claims</option>
            <option value="SETTLED">Settled Claims</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 border-b border-slate-200 font-bold uppercase tracking-wider text-slate-700">
            <tr>
              <th className="p-3.5">Reference ID</th>
              <th className="p-3.5">Claim Type</th>
              <th className="p-3.5">Submitted</th>
              <th className="p-3.5">Reported Status</th>
              <th className="p-3.5">Diagnosis</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredClaims.map((claim) => {
              const diag = analyzeClaim(claim, DEMO_CURRENT_DATE);
              return (
                <tr key={claim.id} className="hover:bg-slate-50 transition-colors font-medium">
                  <td className="p-3.5 font-mono font-bold text-blue-900">{claim.id}</td>
                  <td className="p-3.5 font-bold text-slate-900">{claim.claimType}</td>
                  <td className="p-3.5 text-slate-600">{claim.submissionDate}</td>
                  <td className="p-3.5 font-semibold text-slate-800">{claim.currentStatus}</td>
                  <td className="p-3.5 font-semibold text-amber-900">{diag.title}</td>
                  <td className="p-3.5 text-right">
                    <Link
                      href={`/claim/${claim.id}`}
                      className="px-3 py-1.5 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded text-xs inline-flex items-center gap-1 shadow-2xs"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="block md:hidden space-y-3">
        {filteredClaims.map((claim) => {
          const diag = analyzeClaim(claim, DEMO_CURRENT_DATE);
          return (
            <div key={claim.id} className="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-mono font-bold text-blue-900">{claim.id}</span>
                <span className="font-bold text-slate-900">{claim.claimType}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div>Submitted: <strong>{claim.submissionDate}</strong></div>
                <div>Status: <strong>{claim.currentStatus}</strong></div>
              </div>
              <div className="pt-1 text-amber-900 font-bold">Diagnosis: {diag.title}</div>
              <Link
                href={`/claim/${claim.id}`}
                className="mt-2 w-full py-2 bg-blue-800 text-white font-bold text-xs rounded text-center block"
              >
                View Status Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
