'use client';

import React from 'react';
import { TimelineStage } from '@/types/claim';
import { Check, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClaimJourneyProps {
  stages: TimelineStage[];
}

export const ClaimJourney: React.FC<ClaimJourneyProps> = ({ stages }) => {
  return (
    <div className="bg-[#FFFFFF] rounded-lg border border-[#D8D2CA] p-6 shadow-2xs space-y-6 text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#D8D2CA] pb-3">
        <div>
          <h2 className="text-lg font-bold text-[#432F28] tracking-tight uppercase">CLAIM JOURNEY</h2>
          <p className="text-xs text-[#6B625D]">
            6-stage SLA milestone progress derived from official Citizen&apos;s Charter targets.
          </p>
        </div>
        <span className="text-[11px] font-mono font-semibold px-2.5 py-1 bg-[#F1ECE4] text-[#432F28] rounded border border-[#D8D2CA]">
          SLA Tracker
        </span>
      </div>

      {/* Stepper Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stages.map((stage, idx) => {
          const isCompleted = stage.status === 'completed';
          const isCurrent = stage.status === 'current';
          const isIssue = stage.status === 'issue';
          const isPending = stage.status === 'waiting' || stage.status === 'future';

          return (
            <div
              key={stage.id}
              className={cn(
                'p-3.5 rounded-lg border text-left flex flex-col justify-between space-y-2 relative transition-colors',
                isCompleted && 'bg-[#26734A]/10 border-[#26734A] text-[#262321]',
                isCurrent && 'bg-[#62507D]/10 border-[#62507D] text-[#432F28] font-bold ring-2 ring-[#62507D]/30',
                isIssue && 'bg-[#B7791F]/10 border-[#B7791F] text-[#432F28] font-bold',
                isPending && 'bg-[#F7F7F5] border-[#D8D2CA] text-[#6B625D]'
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                    isCompleted && 'bg-[#26734A] text-white',
                    isCurrent && 'bg-[#62507D] text-white',
                    isIssue && 'bg-[#B7791F] text-white',
                    isPending && 'bg-[#D8D2CA] text-[#6B625D]'
                  )}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : isIssue ? <AlertTriangle className="w-3.5 h-3.5" /> : idx + 1}
                </div>

                {stage.estimatedDaysRange && (
                  <span className="text-[10px] font-mono font-medium opacity-80">
                    {stage.estimatedDaysRange}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-xs font-bold leading-snug">{stage.title}</h3>
                <p className="text-[10px] leading-tight opacity-75 mt-0.5">{stage.description}</p>
              </div>

              <div className="text-[10px] font-mono font-bold pt-1 border-t border-black/10">
                {isCompleted && <span className="text-[#26734A]">✓ Completed</span>}
                {isCurrent && <span className="text-[#62507D]">● Active Stage</span>}
                {isIssue && <span className="text-[#B7791F]">⚠ Potential Issue</span>}
                {isPending && <span className="text-[#6B625D]">○ Pending</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
