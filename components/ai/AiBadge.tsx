import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AiBadgeProps {
  className?: string;
  isAiGenerated?: boolean;
}

export const AiBadge: React.FC<AiBadgeProps> = ({ className, isAiGenerated = true }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-semibold border transition-all',
        isAiGenerated
          ? 'bg-blue-50 text-blue-700 border-blue-200/80 shadow-2xs'
          : 'bg-slate-100 text-slate-700 border-slate-200',
        className
      )}
    >
      <Sparkles className="w-3 h-3 text-blue-600" />
      {isAiGenerated ? 'AI-assisted explanation' : 'Rule-based analysis'}
    </span>
  );
};
