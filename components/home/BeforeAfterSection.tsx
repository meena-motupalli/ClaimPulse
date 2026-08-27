import React from 'react';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const BeforeAfterSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Public Experience Comparison
        </h2>
        <p className="text-xs text-slate-600">
          Comparing the current opaque portal status workflow against ClaimPulse citizen guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* EXISTING CITIZEN EXPERIENCE */}
        <div className="bg-white border border-rose-200 rounded-lg p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-rose-100">
            <div className="w-8 h-8 rounded bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Existing Citizen Experience</h3>
              <p className="text-[11px] text-rose-800 font-semibold">Opaque Status Output</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { title: 'Status Shown', desc: 'Raw status text "Claim Submitted at Portal" without SLA context.' },
              { title: 'Unclear Meaning', desc: 'Citizen does not know if claim is progressing or delayed.' },
              { title: 'Searches Multiple Sources', desc: 'Scours unverified social media and YouTube videos for answers.' },
              { title: 'Uncertain Next Action', desc: 'Unnecessary duplicate claims or premature grievance filings.' },
            ].map((step, idx) => (
              <div key={idx} className="p-3 bg-rose-50/50 rounded border border-rose-200 text-slate-900 space-y-0.5">
                <div className="font-bold text-rose-950 text-xs">
                  {idx + 1}. {step.title}
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CLAIMPULSE EXPERIENCE */}
        <div className="bg-white border border-blue-200 rounded-lg p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-blue-100">
            <div className="w-8 h-8 rounded bg-blue-800 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">ClaimPulse Experience</h3>
              <p className="text-[11px] text-blue-900 font-bold">Structured Citizen Guidance</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { title: 'Status Entry', desc: 'Enter basic claim form type and submission date.' },
              { title: 'Claim Journey', desc: '6-stage visual timeline tracker mapping exact SLA progress.' },
              { title: 'Plain-Language Explanation', desc: 'Clear diagnosis (What We Know vs What We Cannot Determine).' },
              { title: 'Recommended Action', desc: 'Guidance on whether to monitor, update KYC, or wait.' },
              { title: 'Grievance Assistance', desc: 'Pre-filled EPFiGMS draft generator if 20-day SLA is breached.' },
            ].map((step, idx) => (
              <div key={idx} className="p-3 bg-blue-50/50 rounded border border-blue-200 text-slate-900 space-y-0.5">
                <div className="font-bold text-blue-950 text-xs">
                  {idx + 1}. {step.title}
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
