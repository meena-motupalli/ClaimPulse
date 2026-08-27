import React from 'react';
import { SourceTransparencyCard } from '@/components/ai/SourceTransparencyCard';
import { Info, Activity, Lock, Code2, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'About ClaimPulse | EPF Diagnostic Platform',
  description: 'Learn about ClaimPulse - an independent, citizen-side diagnostic and guidance platform for EPFO claim journeys.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
          <Info className="w-3.5 h-3.5" />
          <span>Product Mission & Disclaimers</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          About ClaimPulse
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          ClaimPulse is a citizen-side diagnostic and guidance platform built to bring transparency and clarity to opaque Provident Fund claim journeys.
        </p>
      </div>

      {/* Disclaimers Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-amber-700 font-bold text-base">
          <Lock className="w-5 h-5 text-amber-600" />
          Independence & Trust Notice
        </div>
        <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-950 space-y-2 leading-relaxed">
          <p>
            <strong>ClaimPulse is an independent hackathon prototype project.</strong>
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>ClaimPulse is NOT an official application of the Employees&apos; Provident Fund Organisation (EPFO).</li>
            <li>ClaimPulse does NOT claim direct access to internal EPFO database servers or private API systems.</li>
            <li>ClaimPulse NEVER requests or stores UAN Passwords, OTPs, Aadhaar, PAN, or Bank credentials.</li>
            <li>All analysis is performed deterministically based on public status descriptions and user-provided submission dates.</li>
          </ul>
        </div>
      </div>

      {/* Source Transparency Component */}
      <SourceTransparencyCard />

      {/* Diagnostic Methodology */}
      <div id="methodology" className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          Diagnostic Methodology & AI Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <h3 className="text-sm font-bold text-slate-900">1. SLA Benchmarking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We evaluate elapsed days between your submission date and current date against official EPFO Citizen Charter targets (15-20 working days for Form 19/10C/31, 30 days for Form 13 transfers).
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <h3 className="text-sm font-bold text-slate-900">2. Transparent Limits</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We explicitly separate what can be objectively derived from public status strings (&quot;What We Know&quot;) versus what remains internal to field office desks (&quot;What We Don&apos;t Know&quot;).
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <h3 className="text-sm font-bold text-slate-900">3. Responsible AI Layer</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              AI acts as an enhancement layer for natural language translations, grievance text generation, and scam message evaluation. Deterministic rules decide state.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <h3 className="text-sm font-bold text-slate-900">4. Privacy-First Execution</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All image uploads and user claim entries are processed in local browser memory. Zero sensitive credentials are requested or logged.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-white">
          <Code2 className="w-5 h-5 text-blue-400" />
          Technical Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">Next.js 14 App Router</div>
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">TypeScript (Strict)</div>
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">Zod Validation</div>
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">Gemini AI / Fallback</div>
        </div>
      </div>
    </div>
  );
}
