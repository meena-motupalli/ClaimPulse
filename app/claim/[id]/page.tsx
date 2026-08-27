import React from 'react';
import { getStoredClaims } from '@/lib/storage';
import { INITIAL_MOCK_CLAIMS } from '@/data/mockClaims';
import { analyzeClaim, buildTimelineStages, DEMO_CURRENT_DATE } from '@/lib/claimAnalyzer';
import { calculateDaysElapsed } from '@/lib/utils';
import { ClaimJourney } from '@/components/claim/ClaimJourney';
import { DiagnosisCard } from '@/components/claim/DiagnosisCard';
import { RejectionTranslator } from '@/components/claim/RejectionTranslator';
import { SourceTransparencyCard } from '@/components/ai/SourceTransparencyCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ClaimDetailPageProps {
  params: { id: string };
}

export default function ClaimDetailPage({ params }: ClaimDetailPageProps) {
  const storedClaims = getStoredClaims();
  const allClaims = [...storedClaims, ...INITIAL_MOCK_CLAIMS];
  const claim = allClaims.find((c) => c.id === params.id) || INITIAL_MOCK_CLAIMS[1];

  const diagnosis = analyzeClaim(claim, DEMO_CURRENT_DATE);
  const daysElapsed = calculateDaysElapsed(claim.submissionDate, DEMO_CURRENT_DATE);
  const stages = buildTimelineStages(claim.currentStatus, daysElapsed);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back Button */}
      <Link
        href="/claim"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Claim History
      </Link>

      {/* Page Title */}
      <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Claim Status Report</h1>
          <p className="text-xs text-slate-600">
            Reference Code: <span className="font-mono font-bold text-blue-900">{claim.id}</span>
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-100 text-slate-800 rounded border border-slate-200">
          Source: {claim.source === 'mock_extraction' ? 'Screenshot OCR' : 'Citizen Input'}
        </span>
      </div>

      {/* 1. STRUCTURED SUMMARY PANEL TABLE */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Claim Information Summary
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-medium border border-slate-200 rounded p-4 bg-slate-50/50">
          <div>
            <span className="block text-[10px] text-slate-500 font-bold uppercase">Claim Type</span>
            <span className="font-bold text-slate-900">{claim.claimType}</span>
          </div>

          <div>
            <span className="block text-[10px] text-slate-500 font-bold uppercase">Submitted</span>
            <span className="font-bold text-slate-900">{claim.submissionDate}</span>
          </div>

          <div>
            <span className="block text-[10px] text-slate-500 font-bold uppercase">Reported Status</span>
            <span className="font-bold text-slate-900">{claim.currentStatus}</span>
          </div>

          <div>
            <span className="block text-[10px] text-slate-500 font-bold uppercase">Days Elapsed</span>
            <span className="font-mono font-bold text-blue-900">{daysElapsed} Days</span>
          </div>

          <div>
            <span className="block text-[10px] text-slate-500 font-bold uppercase">Diagnosis</span>
            <span className="font-bold text-amber-900">{diagnosis.title}</span>
          </div>
        </div>
      </div>

      {/* 2. REJECTION TRANSLATOR (If Rejected) */}
      {claim.currentStatus === 'Rejected' && (
        <RejectionTranslator initialReason={claim.rejectionReason} />
      )}

      {/* 3. CLAIM JOURNEY TIMELINE STEPPER */}
      <ClaimJourney stages={stages} />

      {/* 4. CURRENT STATUS & RECOMMENDED NEXT STEP */}
      <DiagnosisCard diagnosis={diagnosis} claimId={claim.id} claimType={claim.claimType} />

      {/* 5. SOURCE TRANSPARENCY CARD */}
      <SourceTransparencyCard />
    </div>
  );
}
