'use client';

import React, { useState } from 'react';
import { translateRejectionReason } from '@/lib/claimAnalyzer';
import { FileText, ArrowRight, CheckCircle2, ShieldAlert, Info, Search } from 'lucide-react';

const REJECTION_PRESETS = [
  { label: 'Name Mismatch', value: 'Name mismatch between UAN profile and Aadhaar card (Joint Declaration required)' },
  { label: 'Bank KYC Issue', value: 'Bank account number/IFSC mismatch or cancelled cheque image unreadable' },
  { label: 'Employer DSC Missing', value: 'Employer digital signature (DSC) non-attestation in Employer e-Sewa' },
  { label: 'Service Eligibility', value: 'Service tenure less than 6 months for Form 10C pension withdrawal' },
  { label: 'Incomplete Info', value: 'Member Date of Exit (DOE) missing in service history' },
  { label: 'Unknown Reason', value: '' },
];

export const RejectionTranslator: React.FC<{ initialReason?: string }> = ({ initialReason }) => {
  const [reasonInput, setReasonInput] = useState<string>(initialReason || REJECTION_PRESETS[0].value);
  const translation = translateRejectionReason(reasonInput);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            EPFO Rejection Remarks Translator
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Understand What Your Rejection Means
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-rose-50 text-rose-700 rounded-lg border border-rose-200">
          Plain Language Guide
        </span>
      </div>

      {/* Preset Pills */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Select or Type a Rejection Remark
        </label>
        <div className="flex flex-wrap gap-2">
          {REJECTION_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setReasonInput(preset.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                reasonInput === preset.value
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea Input */}
      <div className="space-y-1">
        <textarea
          rows={2}
          value={reasonInput}
          onChange={(e) => setReasonInput(e.target.value)}
          placeholder="Paste raw rejection remark from Member e-Sewa portal..."
          className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
        />
      </div>

      {/* Output Translation Card */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 shadow-sm border border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            Translated Category: {translation.category}
          </span>
          <span className="text-xs text-slate-400 font-mono">Official Remark Translation</span>
        </div>

        <h4 className="text-lg font-bold text-white leading-snug">
          {translation.officialTitle}
        </h4>

        <div className="p-3.5 bg-slate-800/90 rounded-xl border border-slate-700 text-xs text-slate-200 leading-relaxed">
          <strong className="text-white font-semibold block mb-1">Plain Language Explanation:</strong>
          {translation.plainLanguageExplanation}
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
            Recommended Corrective Actions:
          </span>
          <ul className="space-y-2 text-xs text-slate-300">
            {translation.recommendedCorrectiveSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
