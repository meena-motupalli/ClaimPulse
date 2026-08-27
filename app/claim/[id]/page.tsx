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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-[#F7F7F5]">
      {/* Back Button */}
      <Link
        href="/claim"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B625D] hover:text-[#432F28] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Claim History
      </Link>

      {/* Page Title */}
      <div className="border-b border-[#D8D2CA] pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-left">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#432F28] uppercase tracking-wide">CLAIM STATUS</h1>
          <p className="text-xs text-[#6B625D]">
            Reference Code: <span className="font-mono font-bold text-[#62507D]">{claim.id}</span>
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 bg-[#F1ECE4] text-[#432F28] rounded border border-[#D8D2CA]">
          Source: {claim.source === 'mock_extraction' ? 'Screenshot OCR' : 'Citizen Input'}
        </span>
      </div>

      {/* 1. STRUCTURED SUMMARY PANEL TABLE */}
      <div className="bg-[#FFFFFF] rounded-lg border border-[#D8D2CA] p-5 shadow-2xs space-y-3 text-left">
        <h2 className="text-sm font-bold text-[#432F28] uppercase tracking-wider">
          Claim Information Summary
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-medium border border-[#D8D2CA] rounded p-4 bg-[#F7F7F5]">
          <div>
            <span className="block text-[10px] text-[#6B625D] font-bold uppercase">Claim Type</span>
            <span className="font-bold text-[#432F28]">{claim.claimType}</span>
          </div>

          <div>
            <span className="block text-[10px] text-[#6B625D] font-bold uppercase">Submitted</span>
            <span className="font-bold text-[#262321]">{claim.submissionDate}</span>
          </div>

          <div>
            <span className="block text-[10px] text-[#6B625D] font-bold uppercase">Reported Status</span>
            <span className="font-bold text-[#262321]">{claim.currentStatus}</span>
          </div>

          <div>
            <span className="block text-[10px] text-[#6B625D] font-bold uppercase">Days Elapsed</span>
            <span className="font-mono font-bold text-[#62507D]">{daysElapsed} Days</span>
          </div>

          <div>
            <span className="block text-[10px] text-[#6B625D] font-bold uppercase">Diagnosis</span>
            <span className="font-bold text-[#B7791F]">{diagnosis.title}</span>
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
