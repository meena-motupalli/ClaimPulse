'use client';

import React, { useState } from 'react';
import { GrievancePack, GrievanceEligibility } from '@/types/claim';
import { Copy, Check, ExternalLink, ShieldCheck, FileText, Edit3, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GrievancePackCardProps {
  grievancePack: GrievancePack;
  eligibility: GrievanceEligibility;
  claimId?: string;
}

export const GrievancePackCard: React.FC<GrievancePackCardProps> = ({
  grievancePack,
  eligibility,
  claimId,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(grievancePack.suggestedGrievanceBody);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (eligibility === 'hidden') {
    return (
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Claim is within normal SLA. Official grievance filing is not advised yet.</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Grievance Status: Monitor First
        </span>
      </div>
    );
  }

  const isRecommended = eligibility === 'recommended';

  return (
    <div
      className={`rounded-2xl border p-6 space-y-4 shadow-sm ${
        isRecommended
          ? 'bg-amber-50/40 border-amber-300'
          : 'bg-white border-slate-200/80'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                isRecommended
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              {isRecommended
                ? 'Recommended: Prepare Grievance Draft'
                : 'Secondary Action: Consider Grievance'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {grievancePack.suggestedGrievanceSubject}
          </h3>
        </div>

        <span className="text-xs font-mono font-bold text-slate-500">
          {grievancePack.daysUnchanged} Days Unchanged
        </span>
      </div>

      {/* Body Preview / Edit */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-600" />
            Structured Grievance Text
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 underline"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {isEditing ? 'Done Editing' : 'Edit Text'}
            </button>
          </div>
        </div>

        {isEditing ? (
          <textarea
            rows={6}
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <div className="p-4 bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed rounded-xl border border-slate-800 shadow-inner">
            {editedBody}
          </div>
        )}
      </div>

      {/* Button Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Grievance Text
            </>
          )}
        </button>

        <a
          href="https://epfigms.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          Open Official EPFiGMS Service
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {claimId && (
          <Link
            href={`/grievance?claimId=${claimId}`}
            className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 underline ml-auto"
          >
            Full EPFiGMS Generator Assistant
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};
