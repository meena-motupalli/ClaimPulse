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
    <div className="bg-[#FFFDF8] border border-[#D7CBBB] rounded-xl p-6 text-left space-y-5 max-w-md mx-auto w-full text-[#292421] shadow-xs">
      <div className="flex items-center justify-between border-b border-[#D7CBBB] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-[#4A3026] flex items-center justify-center text-white font-bold text-xs shrink-0 border border-[#37231B]">
            <FileText className="w-4 h-4 text-[#F3EBDD]" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-[#5B477D]">CP-DEMO-02 • Form 19</div>
            <div className="text-sm font-bold text-[#4A3026]">PF Final Settlement Claim</div>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#E8DDCC] text-[#4A3026] rounded border border-[#D7CBBB]">
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
                isDone && 'bg-[#E8DDCC]/50 border-[#D7CBBB] text-[#292421]',
                isCurrent && 'bg-[#5B477D]/10 border-[#5B477D] text-[#4A3026] font-bold ring-1 ring-[#5B477D]',
                !isDone && !isCurrent && 'bg-[#FFFDF8] border-[#D7CBBB] text-[#665D56]'
              )}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0',
                    isDone && 'bg-[#276749] text-white',
                    isCurrent && 'bg-[#5B477D] text-white',
                    !isDone && !isCurrent && 'bg-[#E8DDCC] text-[#665D56] border border-[#D7CBBB]'
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

      <div className="p-3 bg-[#E8DDCC] rounded-lg border border-[#D7CBBB] text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#4A3026]">
          <Clock className="w-4 h-4 text-[#B7791F] shrink-0" />
          <span className="text-[11px] font-semibold">14 Days Elapsed • SLA Target: 20 Days</span>
        </div>
        <span className="text-[10px] font-mono text-[#276749] font-bold">Within SLA</span>
      </div>
    </div>
  );
};
