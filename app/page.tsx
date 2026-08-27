import React from 'react';
import Link from 'next/link';
import { HeroClaimAnimation } from '@/components/demo/HeroClaimAnimation';
import { TrustBar } from '@/components/home/TrustBar';
import { FeatureCards } from '@/components/home/FeatureCards';
import { BeforeAfterSection } from '@/components/home/BeforeAfterSection';
import { ImpactDashboard } from '@/components/home/ImpactDashboard';
import { ArrowRight, Search, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12 pb-12">
      {/* SERVICE-ORIENTED HERO SECTION */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Service CTAs */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-800" />
              <span>Public Service Diagnostic System</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Track and Understand Your PF Claim
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl">
              Understand your reported claim status, identify possible delays, and find the appropriate next step.
            </p>

            {/* Service CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <Link
                href="/track"
                className="px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-md shadow-xs transition-all flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Track Claim</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/demo"
                className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-md border border-slate-300 transition-all flex items-center gap-1.5"
              >
                <span>View Demo</span>
              </Link>
            </div>

            {/* Privacy Guard Notice */}
            <div className="pt-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Privacy Notice:</strong> ClaimPulse is an independent prototype. Never enter your UAN password, OTP, Aadhaar number, PAN, or bank credentials.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Stepper */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroClaimAnimation />
          </div>
        </div>
      </section>

      {/* SERVICE INFORMATION PANEL */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
            What ClaimPulse Helps You Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium text-slate-800">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
              <div>
                <strong>1. Understand Status</strong>
                <p className="text-[11px] text-slate-600 mt-0.5">Plain-language status explanations.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
              <div>
                <strong>2. View Journey</strong>
                <p className="text-[11px] text-slate-600 mt-0.5">6-stage visual timeline tracker.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
              <div>
                <strong>3. Identify Issues</strong>
                <p className="text-[11px] text-slate-600 mt-0.5">SLA delay & rejection analysis.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
              <div>
                <strong>4. Prepare Grievance</strong>
                <p className="text-[11px] text-slate-600 mt-0.5">Draft complaints for EPFiGMS.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <TrustBar />

      {/* CLAIMPULSE SERVICES */}
      <FeatureCards />

      {/* BEFORE / AFTER COMPARISON SECTION */}
      <BeforeAfterSection />

      {/* CONCEPTUAL IMPACT DASHBOARD */}
      <ImpactDashboard />

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-4xl mx-auto text-center px-4 space-y-4 pt-4">
        <h2 className="text-xl sm:text-3xl font-bold text-slate-900">
          Ready to diagnose your PF claim status?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Evaluate your claim timeline and determine the appropriate next action within seconds.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/track"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-md shadow-xs"
          >
            Track Claim Now
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-md border border-slate-300"
          >
            Open Judge Demo Mode
          </Link>
        </div>
      </section>
    </div>
  );
}
