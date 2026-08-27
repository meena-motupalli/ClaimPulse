import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, FileText, ShieldAlert, ArrowRight } from 'lucide-react';

export const FeatureCards: React.FC = () => {
  const features = [
    {
      title: 'Claim Journey',
      description: 'See where your claim stands across 6 standard processing stages.',
      icon: Activity,
      href: '/claim',
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      title: 'Smart Diagnosis',
      description: 'Understand what the status may mean based on official SLA rules.',
      icon: ShieldCheck,
      href: '/diagnosis',
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      title: 'Grievance Pack',
      description: 'Generate a structured grievance draft tailored for EPFiGMS.',
      icon: FileText,
      href: '/grievance',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      title: 'Scam Shield',
      description: 'Identify common PF-related scam patterns and fake fee demands.',
      icon: ShieldAlert,
      href: '/scam-shield',
      color: 'bg-rose-50 text-rose-600 border-rose-100',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Core Capabilities
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Designed for Citizen Clarity & Action
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-2 flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Explore Feature</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
