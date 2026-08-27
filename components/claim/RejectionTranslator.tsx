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
    <div className="bg-[#FFFDF8] rounded-lg border border-[#D7CBBB] p-6 shadow-2xs space-y-5 text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#D7CBBB] pb-3">
        <div>
          <h2 className="text-lg font-bold text-[#4A3026] flex items-center gap-2 uppercase">
            <FileText className="w-5 h-5 text-[#A33A3A]" />
            Rejection Remark Translator
          </h2>
          <p className="text-xs text-[#665D56]">
            Translates raw portal rejection remark strings into plain-language explanations and corrective steps.
          </p>
        </div>
        <AiBadge />
      </div>

      {/* Input Box */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[#4A3026] uppercase tracking-wider">
          Portal Rejection Remark Text
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={inputReason}
            onChange={(e) => setInputReason(e.target.value)}
            placeholder="Paste raw rejection remark text..."
            className="flex-1 p-2.5 bg-[#FFFDF8] border border-[#D7CBBB] rounded text-xs font-semibold text-[#292421] focus:ring-2 focus:ring-[#A33A3A]"
          />
          <button
            onClick={handleTranslate}
            className="px-5 py-2.5 bg-[#A33A3A] hover:bg-[#852E2E] text-white font-bold text-xs rounded shadow-2xs flex items-center justify-center gap-1.5 shrink-0 border border-[#852E2E]"
          >
            <Search className="w-4 h-4" />
            <span>Translate Remark</span>
          </button>
        </div>
      </div>

      {/* Result Grid */}
      <div className="bg-[#A33A3A]/10 border border-[#A33A3A]/30 rounded p-5 space-y-4 text-xs text-[#292421]">
        <div className="space-y-1">
          <span className="block text-[10px] font-mono uppercase font-bold text-[#A33A3A]">Official Category Title</span>
          <p className="font-bold text-[#A33A3A] text-sm bg-[#FFFDF8] p-2.5 rounded border border-[#A33A3A]/30">
            {translation.officialTitle}
          </p>
        </div>

        <div className="space-y-1">
          <span className="block text-[10px] font-mono uppercase font-bold text-[#4A3026]">Plain-Language Explanation</span>
          <p className="leading-relaxed font-medium bg-[#FFFDF8] p-3 rounded border border-[#D7CBBB] text-[#292421]">
            {translation.plainLanguageExplanation}
          </p>
        </div>

        <div className="space-y-2">
          <span className="block text-[10px] font-mono uppercase font-bold text-[#4A3026]">Recommended Corrective Steps</span>
          <ul className="space-y-1.5 list-disc pl-4 text-[#292421] font-medium leading-relaxed bg-[#FFFDF8] p-3 rounded border border-[#D7CBBB]">
            {translation.recommendedCorrectiveSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="pt-2 border-t border-[#A33A3A]/20 text-[10px] font-mono text-[#665D56]">
          *Important Notice: This explanation is informational and not an official EPFO determination.
        </div>
      </div>
    </div>
  );
};
