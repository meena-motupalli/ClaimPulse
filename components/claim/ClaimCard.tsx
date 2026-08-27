import React from 'react';
import Link from 'next/link';
import { Claim } from '@/types/claim';
import { analyzeClaim, DEMO_CURRENT_DATE } from '@/lib/claimAnalyzer';
import { StatusBadge, SeverityBadge } from '@/components/ui/Badge';
import { formatDate, calculateDaysElapsed } from '@/lib/utils';
import { ArrowRight, Building, Calendar, MapPin, Clock } from 'lucide-react';

interface ClaimCardProps {
  claim: Claim;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
  const diagnosis = analyzeClaim(claim, DEMO_CURRENT_DATE);
  const daysElapsed = calculateDaysElapsed(claim.submissionDate, DEMO_CURRENT_DATE);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all group">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-600 font-mono">{claim.id}</span>
            <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-800 rounded-md">
              {claim.claimType}
            </span>
          </div>
          <h4 className="font-bold text-slate-900 text-base">{claim.notes || `${claim.claimType} Claim`}</h4>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={claim.currentStatus} />
          <SeverityBadge severity={diagnosis.severity} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Submitted: {formatDate(claim.submissionDate)}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="font-semibold text-slate-800">{daysElapsed} days elapsed</span>
        </div>

        {claim.fieldOffice && (
          <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{claim.fieldOffice}</span>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <p className="text-[11px] text-slate-500 truncate max-w-[70%]">
          {diagnosis.title}
        </p>
        <Link
          href={`/claim/${claim.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-0.5 transition-transform"
        >
          View Full Diagnosis
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
