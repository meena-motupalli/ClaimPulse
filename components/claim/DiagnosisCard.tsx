import React from 'react';
import Link from 'next/link';
import { Diagnosis } from '@/types/claim';
import { SeverityBadge } from '@/components/ui/Badge';
import { GrievancePackCard } from '@/components/grievance/GrievancePackCard';
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Info,
  ShieldCheck,
  FileText,
  Clock,
  ExternalLink,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiagnosisCardProps {
  diagnosis: Diagnosis;
  claimId?: string;
  claimType?: string;
}

export const DiagnosisCard: React.FC<DiagnosisCardProps> = ({ diagnosis, claimId, claimType }) => {
  const isWarning = diagnosis.severity === 'warning';
  const isCritical = diagnosis.severity === 'critical';
  const isSuccess = diagnosis.severity === 'success';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden space-y-0">
      {/* 1. SEVERITY INDICATOR & HEADER */}
      <div
        className={cn(
          'p-6 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
          isWarning && 'bg-amber-50/60 border-amber-200',
          isCritical && 'bg-rose-50/60 border-rose-200',
          isSuccess && 'bg-emerald-50/60 border-emerald-200',
          !isWarning && !isCritical && !isSuccess && 'bg-blue-50/60 border-blue-200'
        )}
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Diagnostic Assessment
            </span>
            <SeverityBadge severity={diagnosis.severity === 'normal' ? 'NORMAL' : diagnosis.severity === 'warning' ? 'POTENTIAL_DELAY' : diagnosis.severity === 'critical' ? 'ACTION_REQUIRED' : 'RESOLVED'} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {diagnosis.title}
          </h2>
        </div>

        {/* Confidence Indicator */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 rounded-xl border border-slate-200 shadow-2xs text-xs font-semibold text-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Diagnosis Confidence: {diagnosis.confidence}</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            Based only on provided information.
          </span>
        </div>
      </div>

      {/* 2. SUMMARY: WHAT THIS MEANS */}
      <div className="p-6 border-b border-slate-100 space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-blue-600" />
          What This Means
        </h3>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-800 text-sm font-medium leading-relaxed">
          {diagnosis.summary}
        </div>
      </div>

      {/* 3 & 4. WHAT WE KNOW vs WHAT WE DON'T KNOW */}
      <div className="p-6 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WHAT WE KNOW */}
        <div className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/30 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            What We Know
          </h4>
          <ul className="space-y-2 text-xs text-slate-700">
            {diagnosis.whatWeKnow.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WHAT WE DON'T KNOW */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            What We Don&apos;t Know
          </h4>
          <ul className="space-y-2 text-xs text-slate-600">
            {diagnosis.whatWeDoNotKnow.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5. POSSIBLE REASONS */}
      {diagnosis.possibleReasons.length > 0 && (
        <div className="p-6 border-b border-slate-100 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Possible Internal Reasons
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {diagnosis.possibleReasons.map((reason, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-slate-700">
                • {reason}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. RECOMMENDED ACTIONS */}
      <div className="p-6 border-b border-slate-100 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          What You Should Do (Recommended Actions)
        </h4>

        <div className="space-y-2">
          {diagnosis.recommendedActions.map((action, idx) => (
            <div key={idx} className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start gap-3 text-xs text-blue-950 font-medium">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. WHEN TO ESCALATE / GRIEVANCE PACK */}
      <div className="p-6 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-emerald-600" />
          When To Escalate (Grievance Pack)
        </h4>
        <GrievancePackCard
          grievancePack={diagnosis.grievancePack}
          eligibility={diagnosis.grievanceEligibility}
          claimId={claimId}
        />
      </div>

      {/* Strict Disclaimer Notice */}
      <div className="p-4 bg-slate-50 text-slate-500 text-[11px] leading-relaxed border-t border-slate-100 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <span>{diagnosis.disclaimer}</span>
      </div>
    </div>
  );
};
