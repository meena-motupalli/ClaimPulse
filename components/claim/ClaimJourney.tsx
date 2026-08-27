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
    <div className="bg-[#FFFDF8] rounded-lg border border-[#D7CBBB] p-6 shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#D7CBBB] pb-3">
        <div>
          <h2 className="text-lg font-bold text-[#4A3026] tracking-tight uppercase">CLAIM JOURNEY</h2>
          <p className="text-xs text-[#665D56]">
            6-stage SLA milestone progress derived from official Citizen&apos;s Charter targets.
          </p>
        </div>
        <span className="text-[11px] font-mono font-semibold px-2.5 py-1 bg-[#E8DDCC] text-[#4A3026] rounded border border-[#D7CBBB]">
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
                isCompleted && 'bg-[#276749]/10 border-[#276749] text-[#292421]',
                isCurrent && 'bg-[#5B477D]/10 border-[#5B477D] text-[#4A3026] font-bold ring-2 ring-[#5B477D]/30',
                isIssue && 'bg-[#B7791F]/10 border-[#B7791F] text-[#4A3026] font-bold',
                isPending && 'bg-[#E8DDCC]/40 border-[#D7CBBB] text-[#665D56]'
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                    isCompleted && 'bg-[#276749] text-white',
                    isCurrent && 'bg-[#5B477D] text-white',
                    isIssue && 'bg-[#B7791F] text-white',
                    isPending && 'bg-[#D7CBBB] text-[#665D56]'
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
                {isCompleted && <span className="text-[#276749]">✓ Completed</span>}
                {isCurrent && <span className="text-[#5B477D]">● Active Stage</span>}
                {isIssue && <span className="text-[#B7791F]">⚠ Potential Issue</span>}
                {isPending && <span className="text-[#665D56]">○ Pending</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
