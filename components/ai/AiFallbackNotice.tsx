import React from 'react';
import { Info } from 'lucide-react';

export const AiFallbackNotice: React.FC = () => {
  return (
    <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-center gap-2">
      <Info className="w-4 h-4 text-amber-600 shrink-0" />
      <span>
        AI assistance is temporarily unavailable. ClaimPulse&apos;s basic rule-based diagnosis is still active.
      </span>
    </div>
  );
};
