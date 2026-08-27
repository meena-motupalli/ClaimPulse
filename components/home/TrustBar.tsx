import React from 'react';
import { ShieldCheck, Lock, BookOpen, Clock, FileCheck } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustPoints = [
    {
      title: 'Official SLA Benchmarks',
      desc: 'Mapped directly to official EPFO Citizen’s Charter turn-around times (Form 19: 20 Days).',
      icon: Clock,
    },
    {
      title: 'Zero Credentials Requested',
      desc: 'Never enter UAN Passwords, OTPs, Aadhaar numbers, PAN, or Bank Details.',
      icon: Lock,
    },
    {
      title: 'Actionable Grievance Guidance',
      desc: 'Draft structured EPFiGMS complaint text when standard SLAs are breached.',
      icon: FileCheck,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FFFDF8] rounded-lg border border-[#D7CBBB] p-5 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#E8DDCC] text-[#4A3026] flex items-center justify-center shrink-0 border border-[#D7CBBB]">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 text-left">
                  <h3 className="text-xs font-bold text-[#4A3026]">{point.title}</h3>
                  <p className="text-[11px] text-[#665D56] leading-relaxed">{point.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
