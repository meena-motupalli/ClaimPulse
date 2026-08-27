import React from 'react';
import { AiScamAnalyzer } from '@/components/ai/AiScamAnalyzer';
import { SourceTransparencyCard } from '@/components/ai/SourceTransparencyCard';
import { ShieldAlert, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Scam Shield | ClaimPulse Fraud Prevention',
  description: 'Analyze suspicious PF messages and protect yourself from WhatsApp fees, fake agent scams, and credential phishing.',
};

export default function ScamShieldPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold border border-amber-200">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Citizen Fraud Protection</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          ClaimPulse Scam Shield
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Protect yourself from social media fraudsters, fake WhatsApp &quot;clearance agents&quot;, and phishing scams targeting PF claimants.
        </p>
      </div>

      {/* AI Scam Analyzer Component */}
      <AiScamAnalyzer />

      {/* Source Transparency Component */}
      <SourceTransparencyCard />

      {/* Red Flags Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-600" />
            Top 4 Scam Red Flags
          </h3>
          <ul className="space-y-3 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>Demanding cash, UPI payment, or percentage of PF payout for &quot;fast clearance&quot;.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>Asking for UAN Password, Aadhaar OTP, or Bank Account PIN.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>Unsolicited WhatsApp/Telegram messages from unknown &quot;PF agents&quot;.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>Links pointing to non-governmental domains (e.g. .xyz, .online, bit.ly links).</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Official Verified Domain Rules
          </h3>
          <ul className="space-y-3 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>Official EPFO web portals strictly end with <strong>.gov.in</strong> or <strong>.epfindia.gov.in</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>Grievances should only be filed on <strong>epfigms.gov.in</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>All EPFO online services are completely FREE for citizens.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
