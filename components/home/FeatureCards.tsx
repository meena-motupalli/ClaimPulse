import React from 'react';
import Link from 'next/link';
import { Search, ShieldCheck, FileText, ShieldAlert, ArrowRight } from 'lucide-react';

export const FeatureCards: React.FC = () => {
  const services = [
    {
      title: 'Claim Status',
      description: 'Check and understand your reported claim status.',
      icon: Search,
      href: '/track',
      badge: 'Core Service',
    },
    {
      title: 'Claim Diagnosis',
      description: 'Identify possible delays or issues based on SLA benchmarks.',
      icon: ShieldCheck,
      href: '/diagnosis',
      badge: 'SLA Engine',
    },
    {
      title: 'Grievance Assistance',
      description: 'Prepare a structured grievance draft for official filing.',
      icon: FileText,
      href: '/grievance',
      badge: 'EPFiGMS Draft',
    },
    {
      title: 'Scam Shield',
      description: 'Identify common suspicious PF-related scam messages.',
      icon: ShieldAlert,
      href: '/scam-shield',
      badge: 'Public Security',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          ClaimPulse Services
        </h2>
        <p className="text-xs text-slate-600">
          Structured tools designed for citizen understanding, risk evaluation, and official grievance preparation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="bg-white rounded-lg p-5 border border-slate-200 shadow-2xs hover:border-blue-700 hover:shadow-xs transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded bg-slate-100 text-blue-900 flex items-center justify-center border border-slate-200 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-800">
                <span>Access Service</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
