import React from 'react';
import { Lock, ShieldCheck, FileText, ExternalLink } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <div className="bg-white border-y border-slate-200 py-4 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col items-center justify-center space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
            <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
            Privacy-First
          </div>
          <p className="text-[11px] text-slate-600">Zero sensitive credentials stored</p>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col items-center justify-center space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
            <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
            No Passwords Required
          </div>
          <p className="text-[11px] text-slate-600">No UAN password or OTP needed</p>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col items-center justify-center space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
            <FileText className="w-4 h-4 text-amber-700 shrink-0" />
            AI-Assisted Explanations
          </div>
          <p className="text-[11px] text-slate-600">Human-readable citizen guidance</p>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col items-center justify-center space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
            <ExternalLink className="w-4 h-4 text-blue-700 shrink-0" />
            Official Channel Guidance
          </div>
          <p className="text-[11px] text-slate-600">Directs to verified .gov.in portals</p>
        </div>
      </div>
    </div>
  );
};
