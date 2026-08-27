'use client';

import React from 'react';
import Link from 'next/link';
import { Diagnosis, Severity } from '@/types/claim';
import { AiBadge } from '@/components/ai/AiBadge';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  FileText,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiagnosisCardProps {
  diagnosis: Diagnosis;
  claimId: string;
  claimType: string;
}

export const DiagnosisCard: React.FC<DiagnosisCardProps> = ({ diagnosis, claimId, claimType }) => {
  const getSeverityStyle = (sev: Severity) => {
    switch (sev) {
      case 'critical':
        return {
          bg: 'bg-rose-50 border-rose-300 text-rose-950',
          badge: 'bg-rose-700 text-white',
          icon: ShieldAlert,
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-300 text-amber-950',
          badge: 'bg-amber-700 text-white',
          icon: AlertTriangle,
        };
      case 'success':
        return {
          bg: 'bg-emerald-50 border-emerald-300 text-emerald-950',
          badge: 'bg-emerald-700 text-white',
          icon: CheckCircle2,
        };
      default:
        return {
          bg: 'bg-blue-50 border-blue-300 text-blue-950',
          badge: 'bg-blue-800 text-white',
          icon: ShieldCheck,
        };
    }
  };

  const style = getSeverityStyle(diagnosis.severity);
  const StatusIcon = style.icon;

  return (
    <div className="space-y-6">
      {/* 1. CURRENT STATUS PANEL */}
      <div className={cn('rounded-lg border p-6 shadow-2xs space-y-5', style.bg)}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4">
          <div className="flex items-center gap-3">
            <div className={cn('p-2 rounded font-bold text-white shrink-0', style.badge)}>
              <StatusIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-slate-700">
                Diagnostic Analysis • Ref: {claimId}
              </span>
              <h2 className="text-xl font-bold tracking-tight">{diagnosis.title}</h2>
            </div>
          </div>

          <AiBadge isAiGenerated={false} />
        </div>

        {/* What This Means */}
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">What This Means</h3>
          <p className="text-xs leading-relaxed font-medium text-slate-900 bg-white/90 p-3 rounded border border-black/10">
            {diagnosis.summary}
          </p>
        </div>

        {/* What We Know vs What We Cannot Determine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-3.5 bg-white rounded border border-slate-300 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase text-[11px]">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              What We Know
            </h4>
            <ul className="space-y-1.5 text-slate-700 list-disc pl-4 leading-relaxed font-medium">
              {diagnosis.whatWeKnow.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 bg-white rounded border border-slate-300 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase text-[11px]">
              <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
              What We Cannot Determine
            </h4>
            <ul className="space-y-1.5 text-slate-700 list-disc pl-4 leading-relaxed font-medium">
              {diagnosis.whatWeDoNotKnow.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. RECOMMENDED NEXT STEP */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-base font-bold text-slate-900">Recommended Next Step</h3>
          <p className="text-xs text-slate-600">
            Actionable guidance based on official EPFO Citizen&apos;s Charter SLA standards.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-800 space-y-1">
            <strong>Recommended Citizen Actions:</strong>
            <ol className="list-decimal pl-4 space-y-1 leading-relaxed text-slate-700 mt-1">
              {diagnosis.recommendedActions.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/grievance"
              className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs rounded-md shadow-xs flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Prepare Grievance Draft</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://unifiedportal-mem.epfindia.gov.in/memberinterface/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-md border border-slate-300 flex items-center gap-1.5"
            >
              <span>View Official Member Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
