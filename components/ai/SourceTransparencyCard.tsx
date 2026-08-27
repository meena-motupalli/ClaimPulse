import React from 'react';
import { CheckCircle2, HelpCircle, ShieldCheck } from 'lucide-react';

export const SourceTransparencyCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
        <ShieldCheck className="w-4 h-4 text-blue-600" />
        Source Transparency & Information Boundaries
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* What ClaimPulse Knows */}
        <div className="p-4 bg-emerald-50/50 border border-emerald-200/80 rounded-xl space-y-2">
          <h4 className="font-bold text-emerald-900 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            What ClaimPulse Knows
          </h4>
          <p className="text-slate-600 leading-relaxed font-medium">Based on:</p>
          <ul className="space-y-1 text-slate-700 list-disc pl-4 leading-relaxed">
            <li>Information entered by the user</li>
            <li>Visible text extracted from uploaded screenshots</li>
            <li>Predefined 20-day SLA diagnostic rules</li>
          </ul>
        </div>

        {/* What ClaimPulse Cannot Know */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <h4 className="font-bold text-slate-800 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            What ClaimPulse Cannot Know
          </h4>
          <ul className="space-y-1 text-slate-600 list-disc pl-4 leading-relaxed">
            <li>EPFO internal processing queues</li>
            <li>Private internal status or officer notes</li>
            <li>Field-office administrative decisions</li>
            <li>Backend database system logs</li>
            <li>Official government determinations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
