import React from 'react';
import { Sparkles } from 'lucide-react';

interface AiBadgeProps {
  isAiGenerated?: boolean;
}

export const AiBadge: React.FC<AiBadgeProps> = ({ isAiGenerated = true }) => {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#62507D]/10 text-[#62507D] border border-[#62507D]/30 text-[10px] font-bold uppercase tracking-wider">
      <Sparkles className="w-3 h-3 text-[#62507D]" />
      <span>AI-ASSISTED EXPLANATION</span>
    </div>
  );
};
