'use client';

import React from 'react';
import { TimelineStage } from '@/types/claim';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClaimJourneyProps {
  stages: TimelineStage[];
}

export const ClaimJourney: React.FC<ClaimJourneyProps> = ({ stages }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Claim Journey</h2>
          <p className="text-xs text-slate-600">
            6-stage SLA milestone progress derived from official Citizen&apos;s Charter targets.
          </p>
        </div>
        <span className="text-[11px] font-mono font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded border border-slate-200">
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
                isCompleted && 'bg-emerald-50/60 border-emerald-300 text-emerald-950',
                isCurrent && 'bg-blue-50 border-blue-400 text-blue-950 font-semibold ring-2 ring-blue-700/20',
                isIssue && 'bg-rose-50 border-rose-300 text-rose-950 font-semibold',
                isPending && 'bg-slate-50 border-slate-200 text-slate-500'
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                    isCompleted && 'bg-emerald-700 text-white',
                    isCurrent && 'bg-blue-800 text-white',
                    isIssue && 'bg-rose-700 text-white',
                    isPending && 'bg-slate-200 text-slate-600'
                  )}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
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
                {isCompleted && <span className="text-emerald-800">Completed</span>}
                {isCurrent && <span className="text-blue-800">Active Stage</span>}
                {isIssue && <span className="text-rose-800">Action Required</span>}
                {isPending && <span className="text-slate-500">Pending</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
