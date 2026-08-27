'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Claim } from '@/types/claim';
import { getClaimById } from '@/lib/storage';
import { INITIAL_MOCK_CLAIMS } from '@/data/mockClaims';
import { analyzeClaim, buildTimelineStages, DEMO_CURRENT_DATE } from '@/lib/claimAnalyzer';
import { ClaimJourney } from '@/components/claim/ClaimJourney';
import { DiagnosisCard } from '@/components/claim/DiagnosisCard';
import { ScenarioSwitcher } from '@/components/claim/ScenarioSwitcher';
import { RejectionTranslator } from '@/components/claim/RejectionTranslator';
import { StatusBadge, SeverityBadge } from '@/components/ui/Badge';
import { ClaimDetailSkeleton } from '@/components/ui/Skeleton';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { formatDate, calculateDaysElapsed } from '@/lib/utils';
import { ArrowLeft, Calendar, MapPin, Building, FileText, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ClaimDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [claim, setClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const timer = setTimeout(() => {
      const found = getClaimById(id) || INITIAL_MOCK_CLAIMS.find((c) => c.id === id);
      if (found) {
        setClaim(found);
      } else {
        // Fallback to second demo claim if random id
        setClaim(INITIAL_MOCK_CLAIMS[1]);
      }
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return <ClaimDetailSkeleton />;
  }

  if (error || !claim) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <Link href="/claim" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700">
          <ArrowLeft className="w-4 h-4" /> Back to Claim History
        </Link>
        <ErrorBanner
          title="Claim Details Not Found"
          message={`We couldn't analyze claim record "${id}". It may have been deleted or entered incorrectly.`}
          onRetry={() => router.push('/track')}
        />
      </div>
    );
  }

  const diagnosis = analyzeClaim(claim, DEMO_CURRENT_DATE);
  const daysElapsed = calculateDaysElapsed(claim.submissionDate, DEMO_CURRENT_DATE);
  const stages = buildTimelineStages(claim.currentStatus, daysElapsed);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Navigation & Header Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/claim"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to History
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/grievance?claimId=${claim.id}&type=${encodeURIComponent(claim.claimType)}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors"
          >
            <FileText className="w-4 h-4" />
            Draft EPFiGMS Grievance
          </Link>
        </div>
      </div>

      {/* Scenario Switcher Cards for Judges */}
      <ScenarioSwitcher
        activeClaimId={claim.id}
        onSelectClaim={(selected) => setClaim(selected)}
      />

      {/* Fraud Warning Banner if Scam Flagged */}
      {claim.isScamFlagged && (
        <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl text-xs text-rose-950 flex items-start gap-3 shadow-2xs">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-rose-900">Scam Flagged for this Claim Record</h4>
            <p className="leading-relaxed">
              {claim.scamNotes || 'Official EPFO services are 100% free. Never pay social media agents or share UAN passwords.'}
            </p>
          </div>
        </div>
      )}

      {/* Claim Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                {claim.id}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 bg-slate-100 text-slate-800 rounded-md">
                {claim.claimType}
              </span>
              <StatusBadge status={claim.currentStatus} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              {claim.notes || `${claim.claimType} Claim Journey`}
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <Clock className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <div className="text-sm font-bold text-slate-900">{daysElapsed} Days</div>
              <div className="text-[10px] text-slate-500">Since Submission Date</div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-500" /> Submission Date
            </span>
            <span className="font-bold text-slate-800 block text-sm">{formatDate(claim.submissionDate)}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Building className="w-3 h-3 text-slate-500" /> Employer
            </span>
            <span className="font-bold text-slate-800 block text-xs truncate">{claim.employerName || 'Acme Tech Pvt Ltd'}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-500" /> EPFO Field Office
            </span>
            <span className="font-bold text-slate-800 block text-xs truncate">{claim.fieldOffice || 'RO Gurgaon'}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-slate-500" /> Severity Assessment
            </span>
            <div className="pt-0.5">
              <SeverityBadge severity={diagnosis.severity === 'normal' ? 'NORMAL' : diagnosis.severity === 'warning' ? 'POTENTIAL_DELAY' : diagnosis.severity === 'critical' ? 'ACTION_REQUIRED' : 'RESOLVED'} />
            </div>
          </div>
        </div>
      </div>

      {/* Rejection Translator if Status is Rejected */}
      {claim.currentStatus === 'Rejected' && (
        <RejectionTranslator initialReason={claim.rejectionReason} />
      )}

      {/* Visual Journey Timeline */}
      <ClaimJourney stages={stages} />

      {/* Comprehensive Diagnosis Breakdown */}
      <DiagnosisCard diagnosis={diagnosis} claimId={claim.id} claimType={claim.claimType} />
    </div>
  );
}
