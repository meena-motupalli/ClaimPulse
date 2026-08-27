import React from 'react';
import { Target, HelpCircle, FileText, CheckCircle2, TrendingUp } from 'lucide-react';

export const ImpactDashboard: React.FC = () => {
  const targets = [
    {
      title: 'Reduce Uncertainty',
      description: 'Provides visual SLA timeline maps so citizens know if their claim is progressing or delayed.',
      icon: HelpCircle,
      tag: 'Target Outcome',
    },
    {
      title: 'Reduce Unnecessary Actions',
      description: 'Prevents premature duplicate claims and unnecessary field office visits when claims are within SLA.',
      icon: Target,
      tag: 'Target Outcome',
    },
    {
      title: 'Improve Grievance Quality',
      description: 'Drafts structured, professional complaint text pre-filled with claim reference codes.',
      icon: FileText,
      tag: 'Target Outcome',
    },
    {
      title: 'Improve Citizen Understanding',
      description: 'Translates raw rejection remark codes into plain-language explanations and corrective steps.',
      icon: CheckCircle2,
      tag: 'Target Outcome',
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-16 border-y border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            <span>Product Mission</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What ClaimPulse Aims to Improve
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Designed to reduce avoidable confusion and unnecessary escalation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {targets.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 space-y-3 relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-400/30">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-slate-900 text-slate-400 rounded-md border border-slate-700">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] text-slate-400 font-mono">
          *Note: Impact goals represent architectural design targets for citizen service delivery.
        </p>
      </div>
    </section>
  );
};
