'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Claim } from '@/types/claim';
import { getStoredClaims } from '@/lib/storage';
import { INITIAL_MOCK_CLAIMS } from '@/data/mockClaims';
import { analyzeClaim, DEMO_CURRENT_DATE } from '@/lib/claimAnalyzer';
import { calculateDaysElapsed } from '@/lib/utils';
import { ArrowRight, Filter } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left bg-[#F7F7F5]">
      {/* Page Title & Filter Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#D8D2CA] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#432F28] uppercase">Claim History & Administrative Records</h1>
          <p className="text-xs text-[#6B625D]">
            View stored claims and pre-configured hackathon demo records.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#6B625D]" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 bg-[#FFFFFF] border border-[#D8D2CA] rounded text-xs font-semibold text-[#262321]"
          >
            <option value="ALL">All Claim Statuses</option>
            <option value="SUBMITTED">Submitted / Pending</option>
            <option value="REJECTED">Rejected Claims</option>
            <option value="SETTLED">Settled Claims</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-[#FFFFFF] rounded-lg border border-[#D8D2CA] shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F1ECE4] border-b border-[#D8D2CA] font-bold uppercase tracking-wider text-[#432F28]">
            <tr>
              <th className="p-3.5">Reference ID</th>
              <th className="p-3.5">Claim Type</th>
              <th className="p-3.5">Submitted</th>
              <th className="p-3.5">Current Status</th>
              <th className="p-3.5">SLA</th>
              <th className="p-3.5">Diagnosis</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8D2CA]">
            {filteredClaims.map((claim, idx) => {
              const diag = analyzeClaim(claim, DEMO_CURRENT_DATE);
              const days = calculateDaysElapsed(claim.submissionDate, DEMO_CURRENT_DATE);
              const isBreached = diag.severity === 'critical' || diag.severity === 'warning';

              return (
                <tr key={claim.id} className={`${idx % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F7F7F5]'} hover:bg-[#F1ECE4]/60 transition-colors font-medium`}>
                  <td className="p-3.5 font-mono font-bold text-[#62507D]">{claim.id}</td>
                  <td className="p-3.5 font-bold text-[#432F28]">{claim.claimType}</td>
                  <td className="p-3.5 text-[#6B625D]">{claim.submissionDate}</td>
                  <td className="p-3.5 font-semibold text-[#262321]">{claim.currentStatus}</td>
                  <td className="p-3.5 font-mono text-[11px]">
                    <span className={isBreached ? 'text-[#B7791F] font-bold' : 'text-[#26734A] font-bold'}>
                      {days} / 20 Days
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-[#B7791F]">{diag.title}</td>
                  <td className="p-3.5 text-right">
                    <Link
                      href={`/claim/${claim.id}`}
                      className="px-3 py-1.5 bg-[#432F28] hover:bg-[#32221D] text-white font-bold rounded text-xs inline-flex items-center gap-1 shadow-2xs border border-[#32221D]"
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
          const days = calculateDaysElapsed(claim.submissionDate, DEMO_CURRENT_DATE);
          return (
            <div key={claim.id} className="p-4 bg-[#FFFFFF] rounded-lg border border-[#D8D2CA] shadow-2xs space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-[#D8D2CA] pb-2">
                <span className="font-mono font-bold text-[#62507D]">{claim.id}</span>
                <span className="font-bold text-[#432F28]">{claim.claimType}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[#262321]">
                <div>Submitted: <strong>{claim.submissionDate}</strong></div>
                <div>Status: <strong>{claim.currentStatus}</strong></div>
                <div>SLA: <strong>{days} / 20 Days</strong></div>
                <div>Diagnosis: <strong className="text-[#B7791F]">{diag.title}</strong></div>
              </div>
              <Link
                href={`/claim/${claim.id}`}
                className="mt-2 w-full py-2 bg-[#432F28] text-white font-bold text-xs rounded text-center block"
              >
                View Case Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
