'use client';

import React, { useState } from 'react';
import { translateRejectionReason } from '@/lib/claimAnalyzer';
import { AiBadge } from '@/components/ai/AiBadge';
import { FileText, Search } from 'lucide-react';

interface RejectionTranslatorProps {
  initialReason?: string;
}

export const RejectionTranslator: React.FC<RejectionTranslatorProps> = ({ initialReason = '' }) => {
  const [inputReason, setInputReason] = useState<string>(
    initialReason || 'Name Mismatch between Member Record and Aadhaar / Bank Passbook'
  );
  const [translation, setTranslation] = useState(translateRejectionReason(inputReason));

  const handleTranslate = () => {
    setTranslation(translateRejectionReason(inputReason));
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-2xs space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-rose-700" />
            Rejection Remark Translator
          </h2>
          <p className="text-xs text-slate-600">
            Translates raw portal rejection remark strings into plain-language explanations and corrective steps.
          </p>
        </div>
        <AiBadge />
      </div>

      {/* Input Box */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
          Portal Rejection Remark Text
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={inputReason}
            onChange={(e) => setInputReason(e.target.value)}
            placeholder="Paste raw rejection remark text..."
            className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-rose-800"
          />
          <button
            onClick={handleTranslate}
            className="px-5 py-2.5 bg-rose-800 hover:bg-rose-900 text-white font-bold text-xs rounded shadow-xs flex items-center justify-center gap-1.5 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Translate Remark</span>
          </button>
        </div>
      </div>

      {/* Result Grid */}
      <div className="bg-rose-50/70 border border-rose-200 rounded p-5 space-y-4 text-xs text-slate-900">
        <div className="space-y-1">
          <span className="block text-[10px] font-mono uppercase font-bold text-rose-900">Official Category Title</span>
          <p className="font-bold text-rose-950 text-sm bg-white p-2.5 rounded border border-rose-200">
            {translation.officialTitle}
          </p>
        </div>

        <div className="space-y-1">
          <span className="block text-[10px] font-mono uppercase font-bold text-slate-700">Plain-Language Explanation</span>
          <p className="leading-relaxed font-medium bg-white p-3 rounded border border-slate-200 text-slate-800">
            {translation.plainLanguageExplanation}
          </p>
        </div>

        <div className="space-y-2">
          <span className="block text-[10px] font-mono uppercase font-bold text-slate-700">Recommended Corrective Steps</span>
          <ul className="space-y-1.5 list-disc pl-4 text-slate-800 font-medium leading-relaxed bg-white p-3 rounded border border-slate-200">
            {translation.recommendedCorrectiveSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="pt-2 border-t border-rose-200/80 text-[10px] font-mono text-slate-600">
          *Important Notice: This explanation is informational and not an official EPFO determination.
        </div>
      </div>
    </div>
  );
};
