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
  Clock,
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
          bg: 'bg-[#A33A3A]/10 border-[#A33A3A]/40 text-[#262321]',
          badge: 'bg-[#A33A3A] text-white',
          icon: ShieldAlert,
        };
      case 'warning':
        return {
          bg: 'bg-[#B7791F]/10 border-[#B7791F]/40 text-[#262321]',
          badge: 'bg-[#B7791F] text-white',
          icon: AlertTriangle,
        };
      case 'success':
        return {
          bg: 'bg-[#26734A]/10 border-[#26734A]/40 text-[#262321]',
          badge: 'bg-[#26734A] text-white',
          icon: CheckCircle2,
        };
      default:
        return {
          bg: 'bg-[#62507D]/10 border-[#62507D]/40 text-[#262321]',
          badge: 'bg-[#432F28] text-white',
          icon: ShieldCheck,
        };
    }
  };

  const style = getSeverityStyle(diagnosis.severity);
  const StatusIcon = style.icon;

  const daysElapsed = 14;
  const targetSla = 20;
  const isBreached = diagnosis.severity === 'critical' || diagnosis.severity === 'warning';
  const progressPercent = Math.min(100, Math.round((daysElapsed / targetSla) * 100));

  return (
    <div className="space-y-6 text-left">
      {/* 1. VISUAL CASE MANAGEMENT SLA TRACKER */}
      <div className="bg-[#FFFFFF] rounded-lg border border-[#D8D2CA] p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#D8D2CA] pb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#432F28]" />
            <h3 className="text-xs font-bold text-[#432F28] uppercase tracking-wider">CLAIM SLA TRACKER</h3>
          </div>
          <span
            className={cn(
              'text-[10px] font-mono font-bold px-2 py-0.5 rounded border',
              isBreached
                ? 'bg-[#B7791F]/10 text-[#B7791F] border-[#B7791F]/30'
                : 'bg-[#26734A]/10 text-[#26734A] border-[#26734A]/30'
            )}
          >
            {isBreached ? 'SLA ATTENTION REQUIRED' : 'WITHIN SLA'}
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-[#262321]">
            <span>{daysElapsed} Days Elapsed</span>
            <span className="font-mono text-[11px] text-[#6B625D]">Target SLA: {targetSla} Days</span>
          </div>

          <div className="w-full h-3 bg-[#F7F7F5] rounded-full overflow-hidden border border-[#D8D2CA] flex">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                isBreached ? 'bg-[#B7791F]' : 'bg-[#26734A]'
              )}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. CASE ASSESSMENT DIAGNOSIS PANEL */}
      <div className={cn('rounded-lg border p-6 shadow-2xs space-y-5', style.bg)}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4">
          <div className="flex items-center gap-3">
            <div className={cn('p-2 rounded font-bold text-white shrink-0', style.badge)}>
              <StatusIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#6B625D]">
                Case Assessment • Ref: {claimId}
              </span>
              <h2 className="text-xl font-bold tracking-tight text-[#432F28] uppercase">{diagnosis.title}</h2>
            </div>
          </div>

          <AiBadge isAiGenerated={false} />
        </div>

        {/* What This Means */}
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#432F28]">WHAT THIS MEANS</h3>
          <p className="text-xs leading-relaxed font-semibold text-[#262321] bg-[#FFFFFF] p-3 rounded border border-[#D8D2CA]">
            {diagnosis.summary}
          </p>
        </div>

        {/* What We Know vs What We Cannot Determine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-3.5 bg-[#FFFFFF] rounded border border-[#D8D2CA] space-y-2">
            <h4 className="font-bold text-[#26734A] flex items-center gap-1.5 uppercase text-[11px]">
              <CheckCircle2 className="w-4 h-4 text-[#26734A] shrink-0" />
              WHAT WE KNOW
            </h4>
            <ul className="space-y-1.5 text-[#262321] list-disc pl-4 leading-relaxed font-medium">
              {diagnosis.whatWeKnow.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 bg-[#FFFFFF] rounded border border-[#D8D2CA] space-y-2">
            <h4 className="font-bold text-[#6B625D] flex items-center gap-1.5 uppercase text-[11px]">
              <HelpCircle className="w-4 h-4 text-[#6B625D] shrink-0" />
              WHAT WE CANNOT DETERMINE
            </h4>
            <ul className="space-y-1.5 text-[#262321] list-disc pl-4 leading-relaxed font-medium">
              {diagnosis.whatWeDoNotKnow.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. RECOMMENDED NEXT STEP */}
      <div className="bg-[#FFFFFF] rounded-lg border border-[#D8D2CA] p-6 shadow-2xs space-y-4">
        <div className="border-b border-[#D8D2CA] pb-3">
          <h3 className="text-base font-bold text-[#432F28] uppercase">RECOMMENDED NEXT STEP</h3>
          <p className="text-xs text-[#6B625D]">
            Actionable guidance based on official EPFO Citizen&apos;s Charter SLA standards.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 bg-[#F1ECE4]/60 rounded border border-[#D8D2CA] text-xs text-[#262321] space-y-1">
            <strong className="text-[#432F28]">Recommended Citizen Actions:</strong>
            <ol className="list-decimal pl-4 space-y-1 leading-relaxed text-[#262321] mt-1 font-medium">
              {diagnosis.recommendedActions.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/grievance"
              className="px-5 py-2.5 bg-[#26734A] hover:bg-[#1D5838] text-white font-bold text-xs rounded-md shadow-2xs flex items-center gap-2 border border-[#1D5838]"
            >
              <FileText className="w-4 h-4" />
              <span>Prepare Grievance</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://unifiedportal-mem.epfindia.gov.in/memberinterface/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#FFFFFF] hover:bg-[#F1ECE4] text-[#432F28] font-bold text-xs rounded-md border border-[#432F28] flex items-center gap-1.5"
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
