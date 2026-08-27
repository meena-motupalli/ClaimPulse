import React from 'react';
import { TimelineStage } from '@/types/claim';
import { CheckCircle2, Clock, AlertTriangle, Circle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClaimJourneyProps {
  stages: TimelineStage[];
  currentStageId?: string;
}

export const ClaimJourney: React.FC<ClaimJourneyProps> = ({ stages }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            Claim Journey Timeline
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            6-Stage Citizen Guidance Process Map
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
          Standard SLA: 20 Days
        </span>
      </div>

      {/* Responsive Horizontal Stepper for Desktop, Vertical for Mobile */}
      <div className="hidden lg:grid grid-cols-6 gap-2 relative">
        {stages.map((stage, idx) => {
          const isCompleted = stage.status === 'completed';
          const isCurrent = stage.status === 'current';
          const isWaiting = stage.status === 'waiting';
          const isIssue = stage.status === 'issue';

          return (
            <div
              key={stage.id}
              className={cn(
                'relative flex flex-col justify-between p-3.5 rounded-xl border transition-all text-left min-h-[140px]',
                isCompleted && 'bg-emerald-50/60 border-emerald-200 text-emerald-900',
                isCurrent && 'bg-blue-50 border-blue-300 ring-2 ring-blue-500/20 text-blue-900 shadow-xs',
                isWaiting && 'bg-amber-50/70 border-amber-200 text-amber-900',
                isIssue && 'bg-rose-50 border-rose-200 text-rose-900',
                stage.status === 'future' && 'bg-slate-50 border-slate-200/60 text-slate-400'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-wider uppercase opacity-70">
                  Step 0{idx + 1}
                </span>
                {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                {isCurrent && <Clock className="w-4 h-4 text-blue-600 animate-pulse shrink-0" />}
                {isWaiting && <Clock className="w-4 h-4 text-amber-600 shrink-0" />}
                {isIssue && <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
                {stage.status === 'future' && <Circle className="w-4 h-4 text-slate-300 shrink-0" />}
              </div>

              <div>
                <h4 className="text-xs font-bold leading-tight mb-1">{stage.title}</h4>
                <p className="text-[11px] opacity-80 leading-snug line-clamp-2">{stage.description}</p>
              </div>

              {stage.estimatedDaysRange && (
                <span className="text-[10px] font-mono mt-2 opacity-60">
                  {stage.estimatedDaysRange}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="lg:hidden space-y-3 relative pl-4 border-l-2 border-slate-200 ml-2">
        {stages.map((stage, idx) => {
          const isCompleted = stage.status === 'completed';
          const isCurrent = stage.status === 'current';
          const isWaiting = stage.status === 'waiting';
          const isIssue = stage.status === 'issue';

          return (
            <div key={stage.id} className="relative group">
              {/* Dot Icon */}
              <div
                className={cn(
                  'absolute -left-[25px] top-1.5 w-5 h-5 rounded-full flex items-center justify-center bg-white border-2 text-white',
                  isCompleted && 'border-emerald-600 bg-emerald-600',
                  isCurrent && 'border-blue-600 bg-blue-600 ring-4 ring-blue-100',
                  isWaiting && 'border-amber-500 bg-amber-500',
                  isIssue && 'border-rose-600 bg-rose-600',
                  stage.status === 'future' && 'border-slate-300 bg-white'
                )}
              >
                {isCompleted && <CheckCircle2 className="w-3 h-3 text-white" />}
                {isCurrent && <Clock className="w-3 h-3 text-white animate-spin" />}
              </div>

              <div
                className={cn(
                  'p-3.5 rounded-xl border text-sm',
                  isCompleted && 'bg-emerald-50/50 border-emerald-200',
                  isCurrent && 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/10',
                  isWaiting && 'bg-amber-50/60 border-amber-200',
                  isIssue && 'bg-rose-50/60 border-rose-200',
                  stage.status === 'future' && 'bg-slate-50 border-slate-200 text-slate-500'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {idx + 1}. {stage.title}
                  </span>
                  {stage.estimatedDaysRange && (
                    <span className="text-[10px] text-slate-500 font-mono">
                      {stage.estimatedDaysRange}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{stage.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
