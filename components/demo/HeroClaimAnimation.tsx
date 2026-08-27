'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const HeroClaimAnimation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2); // Default on Processing

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 4) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { id: 1, name: 'Submitted', date: '12 Aug 2026', status: 'Completed' },
    { id: 2, name: 'Validation', date: '15 Aug 2026', status: 'Employer Approved' },
    { id: 3, name: 'Processing', date: '26 Aug 2026', status: 'Under Field Office Audit' },
    { id: 4, name: 'Settlement', date: 'Pending', status: 'Expected Payout' },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl text-left space-y-5 max-w-md mx-auto w-full backdrop-blur-md relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-3 bg-blue-500/10 text-blue-400 rounded-bl-2xl text-[10px] font-mono font-bold border-l border-b border-blue-500/20">
        Live SLA Tracker
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-mono font-bold text-blue-400">CP-DEMO-02 • Form 19</div>
          <div className="text-sm font-bold text-white">PF Final Settlement Claim</div>
        </div>
      </div>

      {/* Animated Stepper Flow */}
      <div className="space-y-3 relative">
        {steps.map((step) => {
          const isDone = step.id < activeStep;
          const isCurrent = step.id === activeStep;

          return (
            <div
              key={step.id}
              className={cn(
                'p-3 rounded-xl border text-xs transition-all flex items-center justify-between',
                isDone && 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300',
                isCurrent && 'bg-blue-900/80 border-blue-400 text-white ring-2 ring-blue-400/30 shadow-lg scale-102',
                !isDone && !isCurrent && 'bg-slate-800/40 border-slate-800 text-slate-500'
              )}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0',
                    isDone && 'bg-emerald-500 text-slate-950',
                    isCurrent && 'bg-blue-500 text-white animate-pulse',
                    !isDone && !isCurrent && 'bg-slate-800 text-slate-500 border border-slate-700'
                  )}
                >
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.id}
                </div>
                <div>
                  <div className="font-bold text-xs">{step.name}</div>
                  <div className="text-[10px] opacity-80">{step.status}</div>
                </div>
              </div>

              <span className="text-[10px] font-mono opacity-60">{step.date}</span>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-blue-950/60 rounded-xl border border-blue-800/60 text-xs text-blue-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold text-[11px]">14 Days Elapsed • SLA Advisory</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 font-bold">100% Free</span>
      </div>
    </div>
  );
};
