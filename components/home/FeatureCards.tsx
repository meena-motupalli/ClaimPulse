import React from 'react';
import Link from 'next/link';
import { Search, ShieldCheck, FileText, ShieldAlert, ArrowRight } from 'lucide-react';

export const FeatureCards: React.FC = () => {
  const services = [
    {
      title: 'Claim Status',
      description: 'Check and understand your reported claim status in plain language.',
      icon: Search,
      href: '/track',
      badge: 'Core Service',
      accentColor: 'border-l-4 border-l-[#4A3026]',
      iconBg: 'bg-[#E8DDCC] text-[#4A3026]',
    },
    {
      title: 'Claim Diagnosis',
      description: 'Identify possible delays or issues based on SLA benchmarks.',
      icon: ShieldCheck,
      href: '/diagnosis',
      badge: 'SLA Engine',
      accentColor: 'border-l-4 border-l-[#5B477D]',
      iconBg: 'bg-[#5B477D]/10 text-[#5B477D]',
    },
    {
      title: 'Grievance Assistance',
      description: 'Prepare a structured grievance draft for official EPFiGMS filing.',
      icon: FileText,
      href: '/grievance',
      badge: 'EPFiGMS Draft',
      accentColor: 'border-l-4 border-l-[#276749]',
      iconBg: 'bg-[#276749]/10 text-[#276749]',
    },
    {
      title: 'Scam Shield',
      description: 'Identify common suspicious PF-related scam messages.',
      icon: ShieldAlert,
      href: '/scam-shield',
      badge: 'Public Security',
      accentColor: 'border-l-4 border-l-[#A33A3A]',
      iconBg: 'bg-[#A33A3A]/10 text-[#A33A3A]',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="border-b border-[#D7CBBB] pb-3">
        <h2 className="text-xl sm:text-2xl font-bold text-[#4A3026] tracking-tight">
          ClaimPulse Services
        </h2>
        <p className="text-xs text-[#665D56]">
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
              className={`bg-[#FFFDF8] rounded-lg p-5 border border-[#D7CBBB] ${item.accentColor} shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-3 group`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded border border-[#D7CBBB] flex items-center justify-center shrink-0 ${item.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#E8DDCC] text-[#292421] rounded border border-[#D7CBBB]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#4A3026] group-hover:text-[#5B477D] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#665D56] leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-2 border-t border-[#E8DDCC] flex items-center justify-between text-xs font-bold text-[#4A3026] group-hover:text-[#5B477D]">
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
