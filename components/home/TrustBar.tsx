import React from 'react';
import { Lock, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-200 border-y border-slate-800 py-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 flex flex-col items-center justify-center space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-400">
            <Lock className="w-4 h-4 shrink-0" />
            Privacy-First
          </div>
          <p className="text-[11px] text-slate-400">Zero sensitive credentials stored</p>
        </div>

        <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 flex flex-col items-center justify-center space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs text-blue-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            No Credentials Required
          </div>
          <p className="text-[11px] text-slate-400">No UAN password or OTP needed</p>
        </div>

        <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 flex flex-col items-center justify-center space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs text-amber-400">
            <Sparkles className="w-4 h-4 shrink-0" />
            AI-Assisted & Clear
          </div>
          <p className="text-[11px] text-slate-400">Human-readable explanations</p>
        </div>

        <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 flex flex-col items-center justify-center space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-400">
            <ExternalLink className="w-4 h-4 shrink-0" />
            Official Channel Guidance
          </div>
          <p className="text-[11px] text-slate-400">Directs to verified .gov.in portals</p>
        </div>
      </div>
    </div>
  );
};
