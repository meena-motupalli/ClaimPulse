'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { GrievanceDraft } from '@/components/grievance/GrievanceDraft';
import { getClaimById } from '@/lib/storage';
import { Claim } from '@/types/claim';
import { FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';

function GrievanceContent() {
  const searchParams = useSearchParams();
  const claimId = searchParams.get('claimId');
  const [claim, setClaim] = useState<Claim | undefined>(undefined);

  useEffect(() => {
    if (claimId) {
      const found = getClaimById(claimId);
      if (found) setClaim(found);
    }
  }, [claimId]);

  return <GrievanceDraft claim={claim} />;
}

export default function GrievancePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
          <FileText className="w-3.5 h-3.5" />
          <span>Official EPFiGMS Template Generator</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Prepare a Structured Grievance Draft
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          If your PF claim has exceeded the official 20-day SLA window, use this tool to draft a clear, professional grievance for EPFiGMS.
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
        <GrievanceContent />
      </Suspense>
    </div>
  );
}
