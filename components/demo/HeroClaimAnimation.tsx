'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, FileText, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export const HeroClaimAnimation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(3); // Processing

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 4) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { id: 1, name: 'Submitted', date: '12 Aug 2026', status: 'Portal Receipt Confirmed' },
    { id: 2, name: 'Validation', date: '15 Aug 2026', status: 'Employer Record Verified' },
    { id: 3, name: 'Processing', date: '26 Aug 2026', status: 'Under Field Office Audit' },
    { id: 4, name: 'Settlement', date: 'Pending', status: 'Expected Bank Transfer' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 text-left space-y-5 max-w-md mx-auto w-full text-slate-100 shadow-md">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-blue-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-blue-400">CP-DEMO-02 • Form 19</div>
            <div className="text-sm font-bold text-white">PF Final Settlement Claim</div>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-blue-950 text-blue-300 rounded border border-blue-800">
          SLA Tracker
        </span>
      </div>

      {/* Stepper Flow */}
      <div className="space-y-2.5">
        {steps.map((step) => {
          const isDone = step.id < activeStep;
          const isCurrent = step.id === activeStep;

          return (
            <div
              key={step.id}
              className={cn(
                'p-3 rounded-lg border text-xs flex items-center justify-between transition-colors',
                isDone && 'bg-slate-800/80 border-slate-700 text-slate-300',
                isCurrent && 'bg-blue-900/90 border-blue-400 text-white font-bold',
                !isDone && !isCurrent && 'bg-slate-900/40 border-slate-800 text-slate-500'
              )}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0',
                    isDone && 'bg-emerald-600 text-white',
                    isCurrent && 'bg-blue-600 text-white',
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

              <span className="text-[10px] font-mono opacity-70">{step.date}</span>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-300">
          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-[11px] font-medium">14 Days Elapsed • Standard SLA Target: 20 Days</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 font-bold">Within SLA</span>
      </div>
    </div>
  );
};
