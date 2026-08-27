import React from 'react';
import { Sparkles } from 'lucide-react';

interface AiBadgeProps {
  isAiGenerated?: boolean;
}

export const AiBadge: React.FC<AiBadgeProps> = ({ isAiGenerated = true }) => {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#5B477D]/10 text-[#5B477D] border border-[#5B477D]/30 text-[10px] font-bold uppercase tracking-wider">
      <Sparkles className="w-3 h-3 text-[#5B477D]" />
      <span>AI-ASSISTED EXPLANATION</span>
    </div>
  );
};
