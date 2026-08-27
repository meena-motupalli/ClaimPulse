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
          bg: 'bg-[#A33A3A]/10 border-[#A33A3A]/40 text-[#292421]',
          badge: 'bg-[#A33A3A] text-white',
          icon: ShieldAlert,
        };
      case 'warning':
        return {
          bg: 'bg-[#B7791F]/10 border-[#B7791F]/40 text-[#292421]',
          badge: 'bg-[#B7791F] text-white',
          icon: AlertTriangle,
        };
      case 'success':
        return {
          bg: 'bg-[#276749]/10 border-[#276749]/40 text-[#292421]',
          badge: 'bg-[#276749] text-white',
          icon: CheckCircle2,
        };
      default:
        return {
          bg: 'bg-[#5B477D]/10 border-[#5B477D]/40 text-[#292421]',
          badge: 'bg-[#4A3026] text-white',
          icon: ShieldCheck,
        };
    }
  };

  const style = getSeverityStyle(diagnosis.severity);
  const StatusIcon = style.icon;

  return (
    <div className="space-y-6 text-left">
      {/* 1. CURRENT STATUS PANEL */}
      <div className={cn('rounded-lg border p-6 shadow-2xs space-y-5', style.bg)}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4">
          <div className="flex items-center gap-3">
            <div className={cn('p-2 rounded font-bold text-white shrink-0', style.badge)}>
              <StatusIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#665D56]">
                Diagnostic Analysis • Ref: {claimId}
              </span>
              <h2 className="text-xl font-bold tracking-tight text-[#4A3026] uppercase">{diagnosis.title}</h2>
            </div>
          </div>

          <AiBadge isAiGenerated={false} />
        </div>

        {/* What This Means */}
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#4A3026]">WHAT THIS MEANS</h3>
          <p className="text-xs leading-relaxed font-semibold text-[#292421] bg-[#FFFDF8] p-3 rounded border border-[#D7CBBB]">
            {diagnosis.summary}
          </p>
        </div>

        {/* What We Know vs What We Cannot Determine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-3.5 bg-[#FFFDF8] rounded border border-[#D7CBBB] space-y-2">
            <h4 className="font-bold text-[#276749] flex items-center gap-1.5 uppercase text-[11px]">
              <CheckCircle2 className="w-4 h-4 text-[#276749] shrink-0" />
              WHAT WE KNOW
            </h4>
            <ul className="space-y-1.5 text-[#292421] list-disc pl-4 leading-relaxed font-medium">
              {diagnosis.whatWeKnow.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 bg-[#FFFDF8] rounded border border-[#D7CBBB] space-y-2">
            <h4 className="font-bold text-[#665D56] flex items-center gap-1.5 uppercase text-[11px]">
              <HelpCircle className="w-4 h-4 text-[#665D56] shrink-0" />
              WHAT WE CANNOT DETERMINE
            </h4>
            <ul className="space-y-1.5 text-[#292421] list-disc pl-4 leading-relaxed font-medium">
              {diagnosis.whatWeDoNotKnow.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. RECOMMENDED NEXT STEP */}
      <div className="bg-[#FFFDF8] rounded-lg border border-[#D7CBBB] p-6 shadow-2xs space-y-4">
        <div className="border-b border-[#D7CBBB] pb-3">
          <h3 className="text-base font-bold text-[#4A3026] uppercase">RECOMMENDED NEXT STEP</h3>
          <p className="text-xs text-[#665D56]">
            Actionable guidance based on official EPFO Citizen&apos;s Charter SLA standards.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 bg-[#F3EBDD] rounded border border-[#D7CBBB] text-xs text-[#292421] space-y-1">
            <strong className="text-[#4A3026]">Recommended Citizen Actions:</strong>
            <ol className="list-decimal pl-4 space-y-1 leading-relaxed text-[#292421] mt-1 font-medium">
              {diagnosis.recommendedActions.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/grievance"
              className="px-5 py-2.5 bg-[#276749] hover:bg-[#1E4E37] text-white font-bold text-xs rounded-md shadow-2xs flex items-center gap-2 border border-[#1E4E37]"
            >
              <FileText className="w-4 h-4" />
              <span>Prepare Grievance</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://unifiedportal-mem.epfindia.gov.in/memberinterface/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#FFFDF8] hover:bg-[#E8DDCC] text-[#4A3026] font-bold text-xs rounded-md border border-[#4A3026] flex items-center gap-1.5"
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
