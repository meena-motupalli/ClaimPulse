'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Lock,
  ExternalLink,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from 'lucide-react';

export default function ScamShieldPage() {
  // Interactive Scam Quiz State
  const [q1Fees, setQ1Fees] = useState<boolean | null>(null);
  const [q2Password, setQ2Password] = useState<boolean | null>(null);
  const [q3Whatsapp, setQ3Whatsapp] = useState<boolean | null>(null);

  const hasRedFlags = q1Fees === true || q2Password === true || q3Whatsapp === true;

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

      {/* Interactive Scam Risk Checker */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Interactive Scam Risk Evaluator
          </h2>
          <p className="text-xs text-slate-500">
            Answer 3 quick questions to evaluate if an offer or message you received is a scam.
          </p>
        </div>

        <div className="space-y-4 text-xs font-medium">
          {/* Question 1 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <p className="font-semibold text-slate-900 text-sm">
              1. Has anyone asked for a fee or commission to speed up your PF claim payout?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setQ1Fees(true)}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  q1Fees === true ? 'bg-rose-600 text-white shadow-xs' : 'bg-white border text-slate-700 hover:bg-slate-100'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setQ1Fees(false)}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  q1Fees === false ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white border text-slate-700 hover:bg-slate-100'
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Question 2 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <p className="font-semibold text-slate-900 text-sm">
              2. Did an agent ask for your UAN Password, OTP, or Bank PIN over phone or chat?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setQ2Password(true)}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  q2Password === true ? 'bg-rose-600 text-white shadow-xs' : 'bg-white border text-slate-700 hover:bg-slate-100'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setQ2Password(false)}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  q2Password === false ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white border text-slate-700 hover:bg-slate-100'
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Question 3 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <p className="font-semibold text-slate-900 text-sm">
              3. Did you receive an unofficial WhatsApp message or Google form promising &quot;instant clearance&quot;?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setQ3Whatsapp(true)}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  q3Whatsapp === true ? 'bg-rose-600 text-white shadow-xs' : 'bg-white border text-slate-700 hover:bg-slate-100'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setQ3Whatsapp(false)}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  q3Whatsapp === false ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white border text-slate-700 hover:bg-slate-100'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>

        {/* Risk Result Banner */}
        {q1Fees !== null || q2Password !== null || q3Whatsapp !== null ? (
          <div
            className={`p-5 rounded-xl border text-xs space-y-2 ${
              hasRedFlags
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : 'bg-emerald-50 border-emerald-300 text-emerald-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {hasRedFlags ? (
                <>
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>HIGH SCAM RISK DETECTED!</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Low Scam Risk - Safe Practice Observed</span>
                </>
              )}
            </div>
            <p className="leading-relaxed">
              {hasRedFlags
                ? 'CRITICAL WARNING: EPFO never demands fees or OTPs. Block the contact immediately and never send money or credentials.'
                : 'Great! Always remember that official EPFO services are 100% free and managed strictly via verified gov.in portals.'}
            </p>
          </div>
        ) : null}
      </div>

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
              <span>Demanding cash, UPI payment, or percentage of PF payout for "fast clearance".</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>Asking for UAN Password, Aadhaar OTP, or Bank Account PIN.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>Unsolicited WhatsApp/Telegram messages from unknown "PF agents".</span>
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
