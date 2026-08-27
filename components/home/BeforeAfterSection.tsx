import React from 'react';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const BeforeAfterSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          The Experience Gap
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Transforming Opaque Statuses into Clear Journeys
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BEFORE CLAIMPULSE */}
        <div className="bg-rose-50/50 border border-rose-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 pb-4 border-b border-rose-200">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-rose-950">Before ClaimPulse</h3>
              <p className="text-xs text-rose-700">Frustrating & Opaque Status Portal</p>
            </div>
          </div>

          <div className="space-y-3 text-xs font-medium">
            {[
              { title: 'Status Shown', desc: 'Raw status text "Claim Submitted at Portal" without guidance.' },
              { title: 'Citizen Confused', desc: 'Is my claim progressing? Is something wrong? When will I get paid?' },
              { title: 'Search Multiple Sources', desc: 'Scours unverified YouTube videos, Reddit, and WhatsApp groups.' },
              { title: 'Unclear Next Action', desc: 'Unnecessary repeat filings or premature support complaints.' },
            ].map((step, idx) => (
              <div key={idx} className="p-3.5 bg-white/90 rounded-2xl border border-rose-200/80 text-slate-800 space-y-1">
                <div className="flex items-center justify-between font-bold text-rose-950 text-xs">
                  <span>{idx + 1}. {step.title}</span>
                  <span className="text-[10px] font-mono text-rose-600">Old Flow</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WITH CLAIMPULSE */}
        <div className="bg-blue-50/50 border border-blue-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-blue-200">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-950">With ClaimPulse</h3>
              <p className="text-xs text-blue-700 font-semibold">Structured Citizen Guidance Platform</p>
            </div>
          </div>

          <div className="space-y-3 text-xs font-medium">
            {[
              { title: 'Status', desc: 'Enter basic claim type & submission date.' },
              { title: 'Journey', desc: '6-stage visual timeline mapping exact SLA progress.' },
              { title: 'Explanation', desc: 'Clear diagnosis breakdown (What We Know vs What We Don\'t Know).' },
              { title: 'Recommended Action', desc: 'Tells you whether to wait, fix KYC, or contact employer.' },
              { title: 'Escalation', desc: 'Pre-filled EPFiGMS grievance draft generator if delayed.' },
            ].map((step, idx) => (
              <div key={idx} className="p-3.5 bg-white rounded-2xl border border-blue-200/80 text-slate-900 shadow-2xs space-y-1">
                <div className="flex items-center justify-between font-bold text-blue-950 text-xs">
                  <span>{idx + 1}. {step.title}</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">ClaimPulse Flow</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
