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
    <div className="space-y-12 pb-12 bg-[#F7F7F5]">
      {/* SERVICE-ORIENTED COMPACT HERO SECTION */}
      <section className="bg-[#FFFFFF] border-b border-[#D8D2CA] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Service CTAs */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#F1ECE4] border border-[#D8D2CA] text-[#432F28] text-xs font-bold uppercase tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-[#62507D]" />
              <span>PUBLIC SERVICE DIAGNOSTIC SYSTEM</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#432F28] tracking-tight leading-tight uppercase">
              Track and Understand <span className="text-[#62507D]">Your PF Claim</span>
            </h1>

            <p className="text-sm sm:text-base text-[#262321] leading-relaxed max-w-xl font-medium">
              Understand your reported claim status, identify possible issues, and find the appropriate next step.
            </p>

            {/* Service CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <Link
                href="/track"
                className="px-6 py-3 bg-[#432F28] hover:bg-[#32221D] text-[#FFFFFF] font-bold text-xs sm:text-sm rounded-md shadow-2xs transition-all flex items-center gap-2 border border-[#32221D]"
              >
                <Search className="w-4 h-4" />
                <span>Track Claim</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/demo"
                className="px-6 py-3 bg-[#FFFFFF] hover:bg-[#F1ECE4] text-[#432F28] font-bold text-xs sm:text-sm rounded-md border border-[#432F28] transition-all flex items-center gap-1.5"
              >
                <span>Open Demo</span>
              </Link>
            </div>

            {/* Privacy Guard Notice */}
            <div className="pt-2">
              <div className="p-3 bg-[#F1ECE4]/60 border border-[#D8D2CA] rounded-md text-xs text-[#262321] flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#26734A] shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed font-medium">
                  <strong>Privacy Notice:</strong> ClaimPulse is an independent prototype. Never enter your UAN password, OTP, Aadhaar number, PAN, or bank credentials.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Case Dashboard Preview Card */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroClaimAnimation />
          </div>
        </div>
      </section>

      {/* SERVICE INFORMATION PANEL */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] rounded-lg border border-[#D8D2CA] p-6 space-y-4 shadow-2xs text-left">
          <h2 className="text-lg font-bold text-[#432F28] border-b border-[#D8D2CA] pb-2">
            What ClaimPulse Helps You Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium text-[#262321]">
            <div className="p-3 bg-[#F7F7F5] rounded border border-[#D8D2CA] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#26734A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#432F28]">1. Understand Status</strong>
                <p className="text-[11px] text-[#6B625D] mt-0.5">Plain-language status explanations.</p>
              </div>
            </div>

            <div className="p-3 bg-[#F7F7F5] rounded border border-[#D8D2CA] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#62507D] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#432F28]">2. View Journey</strong>
                <p className="text-[11px] text-[#6B625D] mt-0.5">6-stage visual timeline tracker.</p>
              </div>
            </div>

            <div className="p-3 bg-[#F7F7F5] rounded border border-[#D8D2CA] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#B7791F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#432F28]">3. Identify Issues</strong>
                <p className="text-[11px] text-[#6B625D] mt-0.5">SLA delay & rejection analysis.</p>
              </div>
            </div>

            <div className="p-3 bg-[#F7F7F5] rounded border border-[#D8D2CA] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#26734A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#432F28]">4. Prepare Grievance</strong>
                <p className="text-[11px] text-[#6B625D] mt-0.5">Draft complaints for EPFiGMS.</p>
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
        <h2 className="text-xl sm:text-3xl font-bold text-[#432F28]">
          Ready to diagnose your PF claim status?
        </h2>
        <p className="text-xs sm:text-sm text-[#6B625D] max-w-lg mx-auto leading-relaxed">
          Evaluate your claim timeline and determine the appropriate next action within seconds.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/track"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#432F28] hover:bg-[#32221D] text-[#FFFFFF] font-bold text-xs sm:text-sm rounded-md shadow-2xs"
          >
            Track Claim Now
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFFFFF] hover:bg-[#F1ECE4] text-[#432F28] font-bold text-xs sm:text-sm rounded-md border border-[#432F28]"
          >
            Open Judge Demo Mode
          </Link>
        </div>
      </section>
    </div>
  );
}
