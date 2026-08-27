import React from 'react';
import { TrackForm } from '@/components/claim/TrackForm';
import { Search, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Track Claim | ClaimPulse',
  description: 'Enter your reported EPFO claim status to get a clear visual journey timeline and diagnostic next steps.',
};

export default function TrackPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
          <Search className="w-3.5 h-3.5" />
          <span>Independent Diagnosis Tool</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Track & Diagnose Your PF Claim
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Provide your basic claim details to generate a 6-stage timeline, delay evaluation, and actionable next steps.
        </p>
      </div>

      {/* Track Form Component */}
      <TrackForm />
    </div>
  );
}
