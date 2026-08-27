'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, FileText, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const HeroClaimAnimation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(3); // Processing

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 5) + 1);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { id: 1, name: 'Submitted', date: '12 Aug', status: 'Receipt Confirmed' },
    { id: 2, name: 'Validation', date: '15 Aug', status: 'Employer Verified' },
    { id: 3, name: 'Processing', date: '26 Aug', status: 'Field Audit' },
    { id: 4, name: 'Settlement', date: 'Pending', status: 'Approved' },
    { id: 5, name: 'Bank Credit', date: 'Pending', status: 'NEFT Transfer' },
  ];

  const daysElapsed = 14;
  const targetSlaDays = 20;
  const progressPercent = Math.min(100, Math.round((daysElapsed / targetSlaDays) * 100));

  return (
    <div className="bg-[#FFFFFF] border border-[#D8D2CA] rounded-lg p-5 text-left space-y-4 max-w-md mx-auto w-full text-[#262321] shadow-2xs">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-[#D8D2CA] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-[#432F28] flex items-center justify-center text-white font-bold text-xs shrink-0 border border-[#32221D]">
            <FileText className="w-4 h-4 text-[#F1ECE4]" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-[#62507D] uppercase">CASE REF: CP-DEMO-02</div>
            <div className="text-xs font-bold text-[#432F28]">Form 19 • PF Final Settlement</div>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#26734A]/10 text-[#26734A] rounded border border-[#26734A]/30">
          WITHIN SLA
        </span>
      </div>

      {/* SLA Visual Progress Bar Component */}
      <div className="p-3 bg-[#F7F7F5] rounded border border-[#D8D2CA] space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#432F28]">
          <span className="flex items-center gap-1.5 font-bold">
            <Clock className="w-3.5 h-3.5 text-[#B7791F]" />
            SLA Tracker
          </span>
          <span className="font-mono text-[10px] font-bold text-[#26734A]">
            {daysElapsed} / {targetSlaDays} Days Elapsed
          </span>
        </div>

        {/* Visual Bar */}
        <div className="w-full h-2.5 bg-[#D8D2CA]/60 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-[#26734A] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 5-Stage Timeline Stepper */}
      <div className="space-y-2">
        <div className="text-[10px] font-mono font-bold uppercase text-[#6B625D]">
          5-Stage SLA Milestone Progress
        </div>
        <div className="grid grid-cols-5 gap-1 text-center">
          {steps.map((step) => {
            const isDone = step.id < activeStep;
            const isCurrent = step.id === activeStep;

            return (
              <div
                key={step.id}
                className={cn(
                  'p-2 rounded border text-[10px] transition-colors flex flex-col items-center justify-between min-h-[58px]',
                  isDone && 'bg-[#26734A]/10 border-[#26734A] text-[#262321]',
                  isCurrent && 'bg-[#62507D]/10 border-[#62507D] text-[#432F28] font-bold ring-1 ring-[#62507D]',
                  !isDone && !isCurrent && 'bg-[#FFFFFF] border-[#D8D2CA] text-[#6B625D]'
                )}
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mb-1',
                    isDone && 'bg-[#26734A] text-white',
                    isCurrent && 'bg-[#62507D] text-white',
                    !isDone && !isCurrent && 'bg-[#F1ECE4] text-[#6B625D] border border-[#D8D2CA]'
                  )}
                >
                  {isDone ? <Check className="w-2.5 h-2.5" /> : step.id}
                </div>
                <span className="font-bold leading-none truncate w-full text-[9px]">{step.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
