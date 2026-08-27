import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

export const BeforeAfterSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-left">
      <div className="border-b border-[#D7CBBB] pb-3">
        <h2 className="text-xl sm:text-2xl font-bold text-[#4A3026] tracking-tight">
          Public Experience Comparison
        </h2>
        <p className="text-xs text-[#665D56]">
          Comparing the current opaque portal status workflow against ClaimPulse citizen guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* EXISTING CITIZEN EXPERIENCE */}
        <div className="bg-[#FFFDF8] border border-[#A33A3A]/40 rounded-lg p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#A33A3A]/20">
            <div className="w-8 h-8 rounded bg-[#A33A3A]/10 text-[#A33A3A] flex items-center justify-center shrink-0 border border-[#A33A3A]/30">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#4A3026]">Existing Citizen Experience</h3>
              <p className="text-[11px] text-[#A33A3A] font-bold">Opaque Status Output</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { title: 'Status Shown', desc: 'Raw status text "Claim Submitted at Portal" without SLA context.' },
              { title: 'Unclear Meaning', desc: 'Citizen does not know if claim is progressing or delayed.' },
              { title: 'Searches Multiple Sources', desc: 'Scours unverified social media and YouTube videos for answers.' },
              { title: 'Uncertain Next Action', desc: 'Unnecessary duplicate claims or premature grievance filings.' },
            ].map((step, idx) => (
              <div key={idx} className="p-3 bg-[#A33A3A]/5 rounded border border-[#A33A3A]/20 text-[#292421] space-y-0.5">
                <div className="font-bold text-[#A33A3A] text-xs">
                  {idx + 1}. {step.title}
                </div>
                <p className="text-[11px] text-[#665D56] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CLAIMPULSE EXPERIENCE */}
        <div className="bg-[#FFFDF8] border border-[#276749]/40 rounded-lg p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#276749]/20">
            <div className="w-8 h-8 rounded bg-[#276749] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#4A3026]">ClaimPulse Experience</h3>
              <p className="text-[11px] text-[#276749] font-bold">Structured Citizen Guidance</p>
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
              <div key={idx} className="p-3 bg-[#276749]/5 rounded border border-[#276749]/20 text-[#292421] space-y-0.5">
                <div className="font-bold text-[#276749] text-xs">
                  {idx + 1}. {step.title}
                </div>
                <p className="text-[11px] text-[#665D56] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
